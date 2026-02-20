import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import BlogDemoCta from "@/components/sections/BlogDemoCta";
import FooterSection from "@/components/sections/FooterSection";
import HeaderSection from "@/components/sections/HeaderSection";

type BlogDetail = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  content_markdown: string | null;
  cover_image_url: string | null;
  cover_alt: string | null;
  tags: string[];
  published_at: string | null;
  created_at: string;
};

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return { url: url.endsWith("/") ? url.slice(0, -1) : url, key };
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function extractYouTubeEmbedUrl(rawUrl: string) {
  try {
    const parsed = new URL(rawUrl);
    const host = parsed.hostname.replace(/^www\./, "").toLowerCase();

    let videoId = "";

    if (host === "youtu.be") {
      videoId = parsed.pathname.split("/").filter(Boolean)[0] ?? "";
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        videoId = parsed.searchParams.get("v") ?? "";
      } else if (parsed.pathname.startsWith("/shorts/")) {
        videoId = parsed.pathname.split("/")[2] ?? "";
      } else if (parsed.pathname.startsWith("/embed/")) {
        videoId = parsed.pathname.split("/")[2] ?? "";
      } else if (parsed.pathname.startsWith("/live/")) {
        videoId = parsed.pathname.split("/")[2] ?? "";
      }
    }

    if (!videoId) return null;

    const start = parsed.searchParams.get("t") ?? parsed.searchParams.get("start");
    const startSeconds = start && /^\d+$/.test(start) ? Number(start) : null;
    const query = startSeconds && startSeconds > 0 ? `?start=${startSeconds}` : "";

    return `https://www.youtube-nocookie.com/embed/${videoId}${query}`;
  } catch {
    return null;
  }
}

function isGifUrl(rawUrl: string) {
  try {
    const parsed = new URL(rawUrl);
    const pathname = decodeURIComponent(parsed.pathname).toLowerCase();
    if (pathname.endsWith(".gif")) return true;

    const format = (parsed.searchParams.get("format") ?? "").toLowerCase();
    return format === "gif";
  } catch {
    return rawUrl.toLowerCase().includes(".gif");
  }
}

async function getPublishedPostBySlug(slug: string): Promise<BlogDetail | null> {
  const supabase = getSupabaseConfig();
  if (!supabase) {
    return null;
  }

  const query = new URLSearchParams({
    select:
      "id,slug,title,summary,content_markdown,cover_image_url,cover_alt,tags,published_at,created_at",
    status: "eq.published",
    slug: `eq.${slug}`,
    limit: "1",
  });

  const response = await fetch(`${supabase.url}/rest/v1/posts?${query.toString()}`, {
    headers: {
      apikey: supabase.key,
      Authorization: `Bearer ${supabase.key}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const rows = (await response.json()) as BlogDetail[];
  return rows[0] ?? null;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`strong-${index}`} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={`text-${index}`}>{part}</span>;
  });
}

function renderMarkdown(markdown: string, firstBlockMarginClass = "mt-2") {
  const normalizedMarkdown = markdown
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n");
  const lines = normalizedMarkdown.split("\n");
  const blocks: ReactNode[] = [];
  let lastWasSpacer = false;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]?.trim() ?? "";
    if (!line) {
      const prevLine = (lines[i - 1] ?? "").trim();
      const nextLine = (lines[i + 1] ?? "").trim();
      const prevIsList = prevLine.startsWith("- ") || /^\d+\.\s+/.test(prevLine);
      const nextIsList = nextLine.startsWith("- ") || /^\d+\.\s+/.test(nextLine);

      if (prevIsList && nextIsList) {
        continue;
      }

      if (blocks.length > 0 && !lastWasSpacer) {
        blocks.push(<div key={`spacer-${i}`} className="h-8" />);
        lastWasSpacer = true;
      }
      continue;
    }
    const isFirstBlock = blocks.length === 0;
    const spacingClass = isFirstBlock ? firstBlockMarginClass : "mt-2";

    const imageMatch = line.match(/^!\[(.*?)\]\((https?:\/\/[^\s)]+)\)$/);
    if (imageMatch) {
      const alt = imageMatch[1] || "Blog image";
      const src = imageMatch[2];
      const gif = isGifUrl(src);
      blocks.push(
        <figure key={`img-${i}`} className={isFirstBlock ? "mt-16 mb-10" : "my-10"}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className={gif ? "mx-auto h-auto w-[240px]" : "w-full rounded-[16px] object-cover"}
            loading="lazy"
          />
        </figure>,
      );
      lastWasSpacer = false;
      continue;
    }

    const bracketImageMatch = line.match(/^\[image\]\((https?:\/\/[^\s)]+)\)$/i);
    if (bracketImageMatch) {
      const src = bracketImageMatch[1];
      const gif = isGifUrl(src);
      blocks.push(
        <figure key={`bracket-img-${i}`} className={isFirstBlock ? "mt-16 mb-10" : "my-10"}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt="Blog image"
            className={gif ? "mx-auto h-auto w-[240px]" : "w-full rounded-[16px] object-cover"}
            loading="lazy"
          />
        </figure>,
      );
      lastWasSpacer = false;
      continue;
    }

    const mediaMatch = line.match(/^\[(embed|video)\]\((https?:\/\/[^\s)]+)\)$/i);
    if (mediaMatch) {
      const src = mediaMatch[2];
      const youtubeEmbedUrl = extractYouTubeEmbedUrl(src);

      if (youtubeEmbedUrl) {
        blocks.push(
          <figure key={`yt-${i}`} className={isFirstBlock ? "mt-16 mb-10" : "my-10"}>
            <div className="relative w-full overflow-hidden rounded-[16px] bg-black pt-[56.25%]">
              <iframe
                src={youtubeEmbedUrl}
                title="YouTube video player"
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </figure>,
        );
      } else {
        blocks.push(
          <p key={`media-link-${i}`} className={`${spacingClass} text-[16px] leading-[30px] text-[#9e9e9e]`}>
            <a href={src} target="_blank" rel="noreferrer" className="underline decoration-[#4A4A4A] underline-offset-4 hover:text-white">
              {src}
            </a>
          </p>,
        );
      }

      lastWasSpacer = false;
      continue;
    }

    if (line === "---") {
      blocks.push(
        <div key={`hr-${i}`} className={isFirstBlock ? "mt-16 border-t border-[#2D2D2D]" : "my-6 border-t border-[#2D2D2D]"} />,
      );
      lastWasSpacer = false;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={`h2-${i}`} className="mt-16 text-[24px] leading-8 font-semibold tracking-[-0.5px] text-white">
          {renderInline(line.slice(3))}
        </h2>,
      );
      lastWasSpacer = false;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={`h3-${i}`} className="mt-16 text-[20px] leading-7 font-semibold tracking-[-0.5px] text-white">
          {renderInline(line.slice(4))}
        </h3>,
      );
      lastWasSpacer = false;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push(
        <h2 key={`h1-${i}`} className="mt-16 text-[24px] leading-8 font-semibold tracking-[-0.5px] text-white">
          {renderInline(line.slice(2))}
        </h2>,
      );
      lastWasSpacer = false;
      continue;
    }

    if (line.startsWith("> ")) {
      blocks.push(
        <blockquote
          key={`quote-${i}`}
          className={`${isFirstBlock ? "mt-16 mb-6" : "my-6"} border-l-2 border-[#3f3f3f] pl-4 text-[16px] leading-[30px] text-[#c8c8c8]`}
        >
          {renderInline(line.slice(2))}
        </blockquote>,
      );
      lastWasSpacer = false;
      continue;
    }

    const orderedMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (orderedMatch) {
      blocks.push(
        <p key={`ol-${i}`} className={`${spacingClass} text-[16px] leading-[30px] text-white`}>
          <span className="mr-2 text-[#d0d0d0]">{orderedMatch[1]}.</span>
          {renderInline(orderedMatch[2])}
        </p>,
      );
      lastWasSpacer = false;
      continue;
    }

    const bulletMatch = line.match(/^- (.*)$/);
    if (bulletMatch) {
      const prevLine = (lines[i - 1] ?? "").trim();
      const bulletSpacingClass = prevLine.startsWith("- ") ? "mt-0" : "mt-1";
      blocks.push(
        <p key={`ul-${i}`} className={`${bulletSpacingClass} flex items-start text-[16px] leading-[30px] text-white`}>
          <span className="mr-2 mt-[6px] inline-flex h-4 w-4 shrink-0 items-center justify-center text-[16px] leading-none text-[#d0d0d0]">
            •
          </span>
          <span className="flex-1">{renderInline(bulletMatch[1])}</span>
        </p>,
      );
      lastWasSpacer = false;
      continue;
    }

    blocks.push(
      <p key={`p-${i}`} className={`${spacingClass} text-[16px] leading-[30px] text-white`}>
        {renderInline(line)}
      </p>,
    );
    lastWasSpacer = false;
  }

  return <div className="mt-8">{blocks}</div>;
}

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: "포스트를 찾을 수 없습니다 | MAX AI Aagent",
      description: "요청한 블로그 포스트를 찾을 수 없습니다.",
    };
  }

  const coverAlt = post.cover_alt || post.title;
  const canonical = `https://getmax.kr/blog/${post.slug}`;

  return {
    title: `${post.title} | MAX AI Aagent`,
    description: post.summary || post.title,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.summary || post.title,
      url: canonical,
      type: "article",
      images: post.cover_image_url
        ? [
            {
              url: post.cover_image_url,
              alt: coverAlt,
            },
          ]
        : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const displayDate = formatDate(post.published_at ?? post.created_at);
  const tags = (post.tags ?? []).slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-[#111113]">
      <HeaderSection />

      <main className="mx-auto w-full max-w-[680px] flex-1 px-4 pt-[128px] md:px-0 md:pt-[176px]">
        <section>
          <h1 className="pb-6 text-[30px] leading-10 font-semibold tracking-[0.5px] text-white md:pb-8 md:text-[36px] md:leading-[46px]">
            {post.title}
          </h1>

          <div className="flex flex-col gap-3 border-b border-[#2d2d2d] py-4 md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2a2a2a] text-[11px] font-semibold text-white">
                M
              </div>
              <p className="text-sm leading-[22px] text-white">MAX Team · Heather</p>
              <p className="text-sm leading-[22px] text-[#858585]">{displayDate}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={`${post.id}-${tag}`}
                  className="inline-flex h-8 items-center justify-center rounded-full bg-[#313922] px-3 text-xs leading-4 text-[#DCFF95]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {post.summary ? (
          <section className="pt-16">
            <h2 className="text-[20px] leading-7 font-semibold text-white">아티클 요약</h2>
            <div className="mt-4 rounded-[14px] bg-[#202020] p-4">
              <p className="text-[16px] leading-[30px] text-[#9e9e9e]">{post.summary}</p>
            </div>
          </section>
        ) : null}

        {post.content_markdown ? (
          <section className="pb-20">
            {renderMarkdown(post.content_markdown, post.summary ? "mt-16" : "mt-2")}
          </section>
        ) : (
          <section className="pb-20 pt-12">
            <p className="text-[16px] leading-[30px] text-[#9e9e9e]">본문 내용이 없습니다.</p>
          </section>
        )}

        <BlogDemoCta />
      </main>

      <FooterSection />
    </div>
  );
}
