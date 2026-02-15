begin;

alter table if exists public.posts
  add column if not exists cover_alt text;

commit;
