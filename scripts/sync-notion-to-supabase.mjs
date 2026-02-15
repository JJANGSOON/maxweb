import fs from "node:fs";
import path from "node:path";
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
  const supabaseUrl = requiredEnv("SUPABASE_URL");
  const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");

  const notionFetch = await notionFetchFactory({ notionToken });

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
    const statusRaw = (getSelect(page, "Status") || "draft").toLowerCase();
    const status = statusRaw === "published" ? "published" : "draft";

    const publishedAt = getDate(page, "PublishedAt");
    const tags = getMultiSelect(page, "Tags");
    const coverImageUrl = getCoverUrl(page);

    const contentMarkdown = await blocksToMarkdown({ notionFetch, pageId: notionPageId });

    records.push({
      notion_page_id: notionPageId,
      slug,
      title,
      summary,
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
