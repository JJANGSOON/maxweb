import type { Metadata } from "next";
import Image from "next/image";
import FooterSection from "@/components/sections/FooterSection";
import HeaderSection from "@/components/sections/HeaderSection";
import ProgressLink from "@/components/ui/ProgressLink";

type BlogListItem = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  cover_image_url: string | null;
  cover_alt: string | null;
  tags: string[];
  published_at: string | null;
  created_at: string;
};

export const metadata: Metadata = {
  title: "블로그 | MAX AI Aagent",
  description: "MAX AI 블로그 목록",
  alternates: {
    canonical: "https://getmax.kr/blog",
  },
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

const POSTS_PER_PAGE = 5;
const BLOG_REVALIDATE_SECONDS = 60;

type PostsResult = {
  items: BlogListItem[];
  total: number;
};

function getVisiblePages(currentPage: number, totalPages: number, windowSize = 5) {
  if (totalPages <= windowSize) {
    return Array.from({ length: totalPages }, (_, idx) => idx + 1);
  }

  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, currentPage - half);
  let end = start + windowSize - 1;

  if (end > totalPages) {
    end = totalPages;
    start = end - windowSize + 1;
  }

  return Array.from({ length: windowSize }, (_, idx) => start + idx);
}

function parseTotalFromContentRange(contentRange: string | null) {
  if (!contentRange) return 0;
  const totalPart = contentRange.split("/")[1];
  const total = Number.parseInt(totalPart ?? "0", 10);
  return Number.isNaN(total) ? 0 : total;
}

async function getPublishedPosts(page: number, limit = POSTS_PER_PAGE): Promise<PostsResult> {
  const supabase = getSupabaseConfig();
  if (!supabase) {
    return { items: [], total: 0 };
  }

  const safePage = Math.max(1, page);
  const offset = (safePage - 1) * limit;

  const query = new URLSearchParams({
    select: "id,slug,title,summary,cover_image_url,cover_alt,tags,published_at,created_at",
    status: "eq.published",
    order: "published_at.desc.nullslast,created_at.desc",
    limit: String(limit),
    offset: String(offset),
  });

  const response = await fetch(`${supabase.url}/rest/v1/posts?${query.toString()}`, {
    headers: {
      apikey: supabase.key,
      Authorization: `Bearer ${supabase.key}`,
      Prefer: "count=exact",
    },
    next: {
      revalidate: BLOG_REVALIDATE_SECONDS,
      tags: ["blog:posts"],
    },
  });

  if (!response.ok) {
    return { items: [], total: 0 };
  }

  const items = (await response.json()) as BlogListItem[];
  const total = parseTotalFromContentRange(response.headers.get("content-range"));

  return { items, total };
}

type BlogListPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function BlogListPage({ searchParams }: BlogListPageProps) {
  const params = (await searchParams) ?? {};
  const page = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1);
  const { items: posts, total } = await getPublishedPosts(page, POSTS_PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  const showPagination = totalPages > 1;
  const paginationItems = getVisiblePages(page, totalPages);

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-[#111113]">
      <HeaderSection />

      <main className="mx-auto w-full max-w-[680px] flex-1 px-5 pt-[128px] md:px-0 md:pt-[176px]">
        <section className="w-full pb-20 md:pb-[120px]">
          <h1
            className="text-[28px] leading-10 font-semibold tracking-[0.5px] text-white md:text-[30px] md:leading-[50px]"
            style={{
              fontFamily: "var(--font-brand)",
            }}
          >
            블로그
          </h1>

          <div className="mt-12 flex flex-col gap-12 md:mt-20 md:gap-16">
            {posts.map((post) => {
              const displayDate = formatDate(post.published_at ?? post.created_at);
              const coverAlt = post.cover_alt || post.title;
              const tags = (post.tags ?? []).slice(0, 3);

              return (
                <article key={post.id} className="flex w-full flex-col-reverse gap-6 md:flex-row md:items-end md:gap-8">
                  <div className="flex min-w-0 flex-1 flex-col gap-6">
                    <div className="flex w-full flex-col gap-2">
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={`${post.id}-${tag}`}
                            className={
                              // "inline-flex h-8 items-center justify-center rounded-full border border-[#2f2f2f] bg-[#202020] px-3 text-xs leading-4 text-white"
                              "inline-flex h-8 items-center justify-center rounded-full bg-[#313922] px-3 text-xs leading-4 text-[#DCFF95]"
                            }
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h2 className="overflow-hidden text-[20px] leading-8 font-semibold text-white [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] md:block md:text-ellipsis md:whitespace-nowrap md:[-webkit-line-clamp:unset]">
                        <ProgressLink href={`/blog/${post.slug}`} className="hover:opacity-85">
                          {post.title}
                        </ProgressLink>
                      </h2>

                      <p
                        className="text-sm leading-[22px] text-[#858585]"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {post.summary || ""}
                      </p>
                    </div>

                    <p className="text-xs leading-4 text-[#858585]">{displayDate}</p>
                  </div>

                  <ProgressLink
                    href={`/blog/${post.slug}`}
                    className="block h-[200px] w-full shrink-0 overflow-hidden rounded-xl md:h-[124px] md:w-[228px]"
                  >
                    {post.cover_image_url ? (
                      <Image
                        src={post.cover_image_url}
                        alt={coverAlt}
                        width={456}
                        height={248}
                        sizes="(max-width: 768px) 100vw, 228px"
                        className="h-full w-full rounded-xl object-cover"
                      />
                    ) : (
                      <div className="h-full w-full rounded-xl bg-[#202020]" />
                    )}
                  </ProgressLink>
                </article>
              );
            })}
          </div>

          {showPagination ? (
            <div className="mt-16 flex flex-wrap items-center justify-center gap-2 text-sm leading-5 md:mt-20">
              {page > 1 ? (
                <ProgressLink
                  href={page === 2 ? "/blog" : `/blog?page=${page - 1}`}
                  className="inline-flex h-9 w-[50px] items-center justify-center rounded-lg"
                  aria-label="이전 페이지"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/icon-chevron-left.svg" alt="" aria-hidden className="h-[18px] w-[18px]" />
                </ProgressLink>
              ) : (
                <span className="inline-flex h-9 w-[50px] items-center justify-center rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/icon-chevron-left.svg" alt="" aria-hidden className="h-[18px] w-[18px] opacity-40" />
                </span>
              )}

              {paginationItems.map((item) => {
                return (
                  <ProgressLink
                    key={item}
                    href={item === 1 ? "/blog" : `/blog?page=${item}`}
                    className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-3 transition ${
                      item === page
                        ? "border border-white text-white"
                        : "text-[#858585] hover:text-white"
                    }`}
                  >
                    {item}
                  </ProgressLink>
                );
              })}

              {page < totalPages ? (
                <ProgressLink
                  href={`/blog?page=${page + 1}`}
                  className="inline-flex h-9 w-[50px] items-center justify-center rounded-lg"
                  aria-label="다음 페이지"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/icon-chevron-right.svg" alt="" aria-hidden className="h-[18px] w-[18px]" />
                </ProgressLink>
              ) : (
                <span className="inline-flex h-9 w-[50px] items-center justify-center rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/icon-chevron-right.svg" alt="" aria-hidden className="h-[18px] w-[18px] opacity-40" />
                </span>
              )}
            </div>
          ) : null}
        </section>

      </main>

      <FooterSection />
    </div>
  );
}
