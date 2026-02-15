import { NextResponse } from "next/server";
import { toKstIsoString } from "@/lib/blog/time";

type PostListItem = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  cover_image_url: string | null;
  cover_alt: string | null;
  tags: string[];
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

type PostListResponseItem = PostListItem & {
  cover_alt_resolved: string;
  published_at_kst: string | null;
  created_at_kst: string | null;
  updated_at_kst: string | null;
};

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return { url, key };
}

export async function GET(request: Request) {
  const supabase = getSupabaseConfig();
  if (!supabase) {
    return NextResponse.json(
      { error: "SUPABASE_URL or API key is missing." },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(
    Number.parseInt(searchParams.get("limit") ?? "20", 10) || 20,
    100,
  );
  const status = searchParams.get("status") ?? "published";

  const queryParams: Record<string, string> = {
    select:
      "id,slug,title,summary,cover_image_url,cover_alt,tags,published_at,created_at,updated_at",
    order: "published_at.desc.nullslast,created_at.desc",
    limit: String(limit),
  };

  if (status === "published") {
    queryParams.status = "eq.published";
  } else if (status === "draft") {
    queryParams.status = "eq.draft";
  }

  const query = new URLSearchParams(queryParams);

  const response = await fetch(`${supabase.url}/rest/v1/posts?${query}`, {
    headers: {
      apikey: supabase.key,
      Authorization: `Bearer ${supabase.key}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    return NextResponse.json(
      { error: "Failed to fetch posts.", detail },
      { status: 500 },
    );
  }

  const rows = (await response.json()) as PostListItem[];
  const items: PostListResponseItem[] = rows.map((row) => ({
    ...row,
    cover_alt_resolved: row.cover_alt || row.title,
    published_at_kst: toKstIsoString(row.published_at),
    created_at_kst: toKstIsoString(row.created_at),
    updated_at_kst: toKstIsoString(row.updated_at),
  }));

  return NextResponse.json({ items });
}
