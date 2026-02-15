-- Blog pipeline spike: initial schema for posts
-- Run this in Supabase SQL Editor (or via supabase migration tooling later).

begin;

create extension if not exists pgcrypto;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  notion_page_id text not null unique,
  slug text not null unique,
  title text not null,
  summary text,
  content_markdown text,
  cover_image_url text,
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_posts_status on public.posts (status);
create index if not exists idx_posts_published_at_desc on public.posts (published_at desc);
create index if not exists idx_posts_created_at_desc on public.posts (created_at desc);
create index if not exists idx_posts_tags_gin on public.posts using gin (tags);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_posts_set_updated_at on public.posts;
create trigger trg_posts_set_updated_at
before update on public.posts
for each row
execute function public.set_updated_at();

-- Enable RLS for production safety. Service role can still read/write.
alter table public.posts enable row level security;

-- Public read policy only for published posts (for client-facing usage).
drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
on public.posts
for select
to anon, authenticated
using (status = 'published');

commit;
