import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { blocksToMarkdown } from "../lib/blog/notion-to-markdown.mjs";

function loadEnvLocal() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;

  const raw = fs.readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;

    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) process.env[key] = value;
  }
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env: ${name}`);
  return value;
}

function getPlainTitle(page) {
  const titleProp = page.properties?.Name;
  const list = titleProp?.title ?? [];
  return list.map((t) => t.plain_text).join("").trim();
}

function getRichText(page, propName) {
  const prop = page.properties?.[propName];
  const list = prop?.rich_text ?? [];
  return list.map((t) => t.plain_text).join("").trim();
}

function getSelect(page, propName) {
  return page.properties?.[propName]?.select?.name ?? null;
}

function getDate(page, propName) {
  return page.properties?.[propName]?.date?.start ?? null;
}

function getMultiSelect(page, propName) {
  return (page.properties?.[propName]?.multi_select ?? []).map((x) => x.name).filter(Boolean);
}

function getFileUrl(fileObj) {
  if (!fileObj) return null;
  if (fileObj.type === "external") return fileObj.external?.url ?? null;
  if (fileObj.type === "file") return fileObj.file?.url ?? null;
  return null;
}

function getCoverUrl(page) {
  const files = page.properties?.Cover?.files ?? [];
  const first = files[0];
  if (first) return getFileUrl(first);

  const pageCover = page.cover;
  if (!pageCover) return null;
  return getFileUrl(pageCover);
}

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeSupabaseUrl(url) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function isNotionAssetUrl(url) {
  if (!url) return false;

  try {
    const host = new URL(url).hostname.toLowerCase();
    return (
      host.includes("notion") ||
      host.includes("amazonaws.com") ||
      host.includes("notion-static.com")
    );
  } catch {
    return false;
  }
}

function getExtFromMimeType(mime) {
  if (!mime) return "bin";
  const type = mime.split(";")[0].trim().toLowerCase();

  if (type === "image/jpeg") return "jpg";
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type === "image/gif") return "gif";
  if (type === "image/svg+xml") return "svg";
  if (type === "application/pdf") return "pdf";
  return "bin";
}

function getExtFromUrl(url) {
  try {
    const pathname = new URL(url).pathname;
    const base = pathname.split("/").pop() ?? "";
    const ext = base.includes(".") ? base.split(".").pop() : "";
    return ext?.toLowerCase() || null;
  } catch {
    return null;
  }
}

function toStableAssetKey(url) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return url;
  }
}

async function ensureStorageBucket({ supabaseUrl, serviceRoleKey, bucket }) {
  const res = await fetch(`${supabaseUrl}/storage/v1/bucket`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: bucket,
      name: bucket,
      public: true,
    }),
  });

  if (res.ok) return;

  const text = await res.text();
  if (
    res.status === 409 ||
    text.includes('"statusCode":"409"') ||
    text.toLowerCase().includes("already exists")
  ) {
    return;
  }

  throw new Error(`Supabase create bucket error (${res.status}): ${text}`);
}

async function uploadBufferToStorage({
  supabaseUrl,
  serviceRoleKey,
  bucket,
  objectPath,
  buffer,
  contentType,
}) {
  const encodedPath = objectPath
    .split("/")
    .map((x) => encodeURIComponent(x))
    .join("/");

  const res = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${encodedPath}`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "x-upsert": "true",
      "Content-Type": contentType || "application/octet-stream",
    },
    body: buffer,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase storage upload error (${res.status}): ${text}`);
  }

  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${encodedPath}`;
}

async function uploadRemoteAsset({
  url,
  notionPageId,
  assetType,
  supabaseUrl,
  serviceRoleKey,
  bucket,
  cache,
}) {
  if (!url || !isNotionAssetUrl(url)) return url;
  const stableKey = toStableAssetKey(url);
  const cacheKey = `${notionPageId}:${assetType || "content_img"}:${stableKey}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const fileRes = await fetch(url);
  if (!fileRes.ok) {
    throw new Error(`Asset download failed (${fileRes.status}): ${url}`);
  }

  const arrayBuffer = await fileRes.arrayBuffer();
  const contentType = fileRes.headers.get("content-type") || "application/octet-stream";
  const ext = getExtFromUrl(stableKey) || getExtFromMimeType(contentType);
  const safeAssetType = assetType || "content_img";
  const objectPath =
    safeAssetType === "cover"
      ? `notion/${notionPageId}/cover/cover`
      : `notion/${notionPageId}/content_img/${crypto
          .createHash("sha1")
          .update(stableKey)
          .digest("hex")
          .slice(0, 16)}.${ext}`;

  const publicUrl = await uploadBufferToStorage({
    supabaseUrl,
    serviceRoleKey,
    bucket,
    objectPath,
    buffer: Buffer.from(arrayBuffer),
    contentType,
  });

  cache.set(cacheKey, publicUrl);
  return publicUrl;
}

async function replaceMarkdownImageUrls({
  markdown,
  notionPageId,
  supabaseUrl,
  serviceRoleKey,
  bucket,
  cache,
}) {
  if (!markdown) return markdown;

  const matches = [...markdown.matchAll(/!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g)];
  if (!matches.length) return markdown;

  let out = markdown;
  for (const match of matches) {
    const full = match[0];
    const alt = match[1];
    const src = match[2];
    const uploadedUrl = await uploadRemoteAsset({
      url: src,
      notionPageId,
      assetType: "content_img",
      supabaseUrl,
      serviceRoleKey,
      bucket,
      cache,
    });

    if (uploadedUrl !== src) {
      const replaced = `![${alt}](${uploadedUrl})`;
      out = out.replace(full, replaced);
    }
  }

  return out;
}

async function notionFetchFactory({ notionToken }) {
  return async (urlPath, options = {}) => {
    const res = await fetch(`https://api.notion.com${urlPath}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${notionToken}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Notion API error (${res.status}): ${text}`);
    }

    return res.json();
  };
}

async function queryNotionDatabase({ notionFetch, databaseId }) {
  const pages = [];
  let cursor = undefined;

  while (true) {
    const payload = { page_size: 100 };
    if (cursor) payload.start_cursor = cursor;

    const res = await notionFetch(`/v1/databases/${databaseId}/query`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    pages.push(...(res.results ?? []));
    if (!res.has_more) break;
    cursor = res.next_cursor;
  }

  return pages;
}

async function upsertPosts({ supabaseUrl, serviceRoleKey, records }) {
  const url = new URL("/rest/v1/posts", supabaseUrl);
  url.searchParams.set("on_conflict", "notion_page_id");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(records),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase upsert error (${res.status}): ${text}`);
  }

  return res.json();
}

async function main() {
  loadEnvLocal();

  const notionToken = requiredEnv("NOTION_TOKEN");
  const notionDatabaseId = requiredEnv("NOTION_DATABASE_ID");
  const supabaseUrl = normalizeSupabaseUrl(requiredEnv("SUPABASE_URL"));
  const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  const storageBucket = process.env.SUPABASE_STORAGE_BUCKET || "blog-assets";

  const notionFetch = await notionFetchFactory({ notionToken });
  const assetCache = new Map();

  await ensureStorageBucket({
    supabaseUrl,
    serviceRoleKey,
    bucket: storageBucket,
  });

  const pages = await queryNotionDatabase({ notionFetch, databaseId: notionDatabaseId });
  console.log(`[sync] fetched pages from notion: ${pages.length}`);

  const records = [];

  for (const page of pages) {
    const title = getPlainTitle(page);
    if (!title) continue;

    const notionPageId = page.id;
    const slugRaw = getRichText(page, "Slug");
    const slug = slugRaw || slugify(title);

    const summary = getRichText(page, "Summary") || null;
    const coverAlt = getRichText(page, "CoverAlt") || null;
    const statusRaw = (getSelect(page, "Status") || "draft").toLowerCase();
    const status = statusRaw === "published" ? "published" : "draft";

    const publishedAt = getDate(page, "PublishedAt");
    const tags = getMultiSelect(page, "Tags");
    const coverImageUrlRaw = getCoverUrl(page);

    const contentMarkdownRaw = await blocksToMarkdown({ notionFetch, pageId: notionPageId });
    const contentMarkdown = await replaceMarkdownImageUrls({
      markdown: contentMarkdownRaw,
      notionPageId,
      supabaseUrl,
      serviceRoleKey,
      bucket: storageBucket,
      cache: assetCache,
    });
    const coverImageUrl = await uploadRemoteAsset({
      url: coverImageUrlRaw,
      notionPageId,
      assetType: "cover",
      supabaseUrl,
      serviceRoleKey,
      bucket: storageBucket,
      cache: assetCache,
    });

    records.push({
      notion_page_id: notionPageId,
      slug,
      title,
      summary,
      cover_alt: coverAlt,
      content_markdown: contentMarkdown || null,
      cover_image_url: coverImageUrl,
      tags,
      status,
      published_at: publishedAt,
    });
  }

  console.log(`[sync] mapped records: ${records.length}`);

  if (!records.length) {
    console.log("[sync] nothing to upsert");
    return;
  }

  const rows = await upsertPosts({
    supabaseUrl,
    serviceRoleKey,
    records,
  });

  console.log(`[sync] upsert completed: ${rows.length}`);
  for (const row of rows) {
    console.log(` - ${row.slug} (${row.status})`);
  }
}

main().catch((err) => {
  console.error("[sync] failed");
  console.error(err);
  process.exitCode = 1;
});
