import fs from "node:fs";
import path from "node:path";

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

function normalizeSupabaseUrl(url) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function parseBool(value, fallback = false) {
  if (value === undefined) return fallback;
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
}

function parseIntSafe(value, fallback) {
  const n = Number.parseInt(value ?? "", 10);
  return Number.isNaN(n) ? fallback : n;
}

function escapeRegExp(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractReferencedStoragePaths({ supabaseUrl, bucket, posts }) {
  const referenced = new Set();
  const base = `${supabaseUrl}/storage/v1/object/public/${bucket}/`;
  const baseRegex = new RegExp(`${escapeRegExp(base)}([^\\s)"']+)`, "g");

  for (const post of posts) {
    const cover = post.cover_image_url ?? "";
    if (cover.startsWith(base)) {
      referenced.add(decodeURIComponent(cover.slice(base.length)));
    }

    const markdown = post.content_markdown ?? "";
    for (const match of markdown.matchAll(baseRegex)) {
      const objectPath = match[1];
      if (objectPath) {
        referenced.add(decodeURIComponent(objectPath));
      }
    }
  }

  return referenced;
}

async function fetchPosts({ supabaseUrl, serviceRoleKey }) {
  const query = new URLSearchParams({
    select: "id,cover_image_url,content_markdown,status",
    status: "in.(draft,published)",
    limit: "1000",
  });

  const response = await fetch(`${supabaseUrl}/rest/v1/posts?${query.toString()}`, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase fetch posts error (${response.status}): ${detail}`);
  }

  return response.json();
}

async function listStoragePrefix({ supabaseUrl, serviceRoleKey, bucket, prefix }) {
  const files = [];

  async function walk(currentPrefix) {
    let offset = 0;

    while (true) {
      const response = await fetch(`${supabaseUrl}/storage/v1/object/list/${bucket}`, {
        method: "POST",
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prefix: currentPrefix,
          limit: 100,
          offset,
          sortBy: { column: "name", order: "asc" },
        }),
      });

      if (!response.ok) {
        const detail = await response.text();
        throw new Error(`Supabase list storage error (${response.status}): ${detail}`);
      }

      const rows = await response.json();
      if (!Array.isArray(rows) || rows.length === 0) {
        break;
      }

      for (const row of rows) {
        const name = row.name;
        if (!name) continue;

        const isFolder = row.id == null;
        if (isFolder) {
          const childPrefix = currentPrefix ? `${currentPrefix}/${name}` : name;
          await walk(childPrefix);
          continue;
        }

        files.push({
          path: currentPrefix ? `${currentPrefix}/${name}` : name,
          created_at: row.created_at ?? null,
          updated_at: row.updated_at ?? null,
        });
      }

      if (rows.length < 100) {
        break;
      }

      offset += rows.length;
    }
  }

  await walk(prefix);
  return files;
}

function isOlderThanRetention({ createdAt, updatedAt, retentionDays }) {
  const target = updatedAt || createdAt;
  if (!target) return true;

  const time = new Date(target).getTime();
  if (Number.isNaN(time)) return true;

  const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
  return time < cutoff;
}

async function deleteStorageObject({ supabaseUrl, serviceRoleKey, bucket, objectPath }) {
  const encoded = objectPath
    .split("/")
    .map((x) => encodeURIComponent(x))
    .join("/");

  const response = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${encoded}`, {
    method: "DELETE",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase delete storage error (${response.status}): ${detail}`);
  }
}

async function main() {
  loadEnvLocal();

  const supabaseUrl = normalizeSupabaseUrl(requiredEnv("SUPABASE_URL"));
  const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "blog-assets";
  const dryRun = parseBool(process.env.CLEANUP_DRY_RUN, false);
  const retentionDays = Math.max(0, parseIntSafe(process.env.CLEANUP_RETENTION_DAYS, 7));

  const posts = await fetchPosts({ supabaseUrl, serviceRoleKey });
  const referenced = extractReferencedStoragePaths({ supabaseUrl, bucket, posts });
  console.log(`[cleanup] posts scanned: ${posts.length}`);
  console.log(`[cleanup] referenced assets: ${referenced.size}`);

  const files = await listStoragePrefix({
    supabaseUrl,
    serviceRoleKey,
    bucket,
    prefix: "notion",
  });

  const candidates = files.filter((file) => {
    if (referenced.has(file.path)) return false;
    return isOlderThanRetention({
      createdAt: file.created_at,
      updatedAt: file.updated_at,
      retentionDays,
    });
  });

  console.log(`[cleanup] files in bucket prefix(notion): ${files.length}`);
  console.log(`[cleanup] delete candidates (older than ${retentionDays}d): ${candidates.length}`);

  if (dryRun) {
    for (const item of candidates.slice(0, 20)) {
      console.log(` - [dry-run] ${item.path}`);
    }
    if (candidates.length > 20) {
      console.log(` ... and ${candidates.length - 20} more`);
    }
    return;
  }

  for (const item of candidates) {
    await deleteStorageObject({
      supabaseUrl,
      serviceRoleKey,
      bucket,
      objectPath: item.path,
    });
    console.log(` - deleted: ${item.path}`);
  }

  console.log(`[cleanup] completed deletions: ${candidates.length}`);
}

main().catch((err) => {
  console.error("[cleanup] failed");
  console.error(err);
  process.exitCode = 1;
});
