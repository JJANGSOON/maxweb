import { NextResponse } from "next/server";

type PostDetail = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  content_markdown: string | null;
  cover_image_url: string | null;
  tags: string[];
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
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

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const supabase = getSupabaseConfig();
  if (!supabase) {
    return NextResponse.json(
      { error: "SUPABASE_URL or API key is missing." },
      { status: 500 },
    );
  }

  const { slug } = await context.params;
  const { searchParams } = new URL(request.url);
  const preview = searchParams.get("preview") === "1";

  const queryParams: Record<string, string> = {
    select:
      "id,slug,title,summary,content_markdown,cover_image_url,tags,status,published_at,created_at,updated_at",
    slug: `eq.${slug}`,
    limit: "1",
  };

  if (!preview) {
    queryParams.status = "eq.published";
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
      { error: "Failed to fetch post.", detail },
      { status: 500 },
    );
  }

  const rows = (await response.json()) as PostDetail[];
  const item = rows[0];

  if (!item) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  return NextResponse.json({ item });
}
