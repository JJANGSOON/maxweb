# Blog Data Pipeline Spike Guide

## 0) 목적
- 이번 스파이크 목표는 UI 개발이 아니라 데이터 파이프라인 검증입니다.
- 검증 범위:
  1. Notion 데이터가 Supabase에 정상 저장되는지
  2. Supabase에서 API로 조회 가능한지
  3. 클라이언트에서 해당 API 호출이 안정적으로 되는지

## 1) 범위
- 포함:
  - Supabase 테이블 설계
  - Notion -> Supabase 적재 로직(수동/스크립트/서버리스 중 1개)
  - 조회 API 테스트
- 제외:
  - 어드민 UI
  - 블로그 최종 프론트 디자인/퍼블리싱

## 2) 제안 아키텍처 (스파이크)
1. 작성: Notion Database
2. 동기화: 스크립트 또는 함수가 Notion API 조회
3. 저장: Supabase `posts` 테이블 upsert
4. 제공: 서버 API(`/api/blog`)에서 Supabase 조회
5. 소비: 클라이언트 fetch로 목록/상세 노출 가능 여부 확인

## 3) 데이터 모델 (초안)
### table: posts
- id: uuid (pk)
- notion_page_id: text (unique)
- slug: text (unique)
- title: text
- summary: text
- content_markdown: text
- cover_image_url: text
- cover_alt: text
- tags: text[]
- status: text (`draft` | `published`)
- published_at: timestamptz
- updated_at: timestamptz
- created_at: timestamptz default now()

### 인덱스
- index on status
- index on published_at desc
- unique index on slug
- unique index on notion_page_id

## 4) Notion 속성 매핑 (초안)
- Name -> title
- Slug -> slug
- Summary -> summary
- Content (속성) -> 사용하지 않음 (선택)
- 페이지 본문 블록 -> content_markdown (실제 본문 소스)
- Cover -> cover_image_url
- CoverAlt -> cover_alt
- Tags (multi_select) -> tags[]
- Status (select) -> status
- PublishedAt (date) -> published_at
- LastEditedTime -> updated_at

## 5) API 계약 (스파이크용)
### GET /api/blog
- query:
  - page (optional)
  - limit (optional)
  - tag (optional)
- response:
  - items: { slug, title, summary, cover_image_url, cover_alt, cover_alt_resolved, tags, published_at }[]
  - pageInfo: { page, limit, hasNext }

### GET /api/blog/:slug
- response:
  - { slug, title, summary, content_markdown, cover_image_url, cover_alt, cover_alt_resolved, tags, published_at }

## 6) 환경변수
- NOTION_TOKEN
- NOTION_DATABASE_ID
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- SUPABASE_STORAGE_BUCKET (optional, default: `blog-assets`)
- NEXT_PUBLIC_SITE_URL

## 7) 테스트 체크리스트
- [ ] Notion에서 신규 글 1개 작성
- [ ] 동기화 실행 시 Supabase에 1건 insert
- [ ] 동일 글 수정 후 동기화 시 upsert(update) 동작
- [ ] `status=draft`는 API 목록에서 제외
- [ ] `status=published`만 API 목록 노출
- [ ] `/api/blog` 응답 시간/형식 확인
- [ ] `/api/blog/:slug` 404 처리 확인
- [ ] 클라이언트 fetch로 목록 데이터 렌더 확인

## 8) 구현 단계 제안
1. Supabase 스키마 생성
2. Notion 매핑 유틸 작성
3. 동기화 함수 작성(upsert)
4. API route 작성
5. Postman/curl로 API 검증
6. 간단한 클라이언트 fetch 테스트

## 9) 완료 기준 (Definition of Done)
- Notion -> Supabase 적재 로그 확인 가능
- published 글 목록/상세 API가 정상 응답
- 최소 1회 end-to-end 테스트(작성 -> 동기화 -> API 조회 -> 클라이언트 표시) 통과

---

## 10) 2단계 실행 방법 (Notion -> Supabase)
1. `.env.blog.example`를 참고해 `.env.local`에 아래 값을 추가
   - `NOTION_TOKEN`
   - `NOTION_DATABASE_ID`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_STORAGE_BUCKET` (optional)
2. Notion DB 속성명을 아래와 정확히 맞춤
   - `Name`(title), `Slug`(rich_text), `Summary`(rich_text), `Status`(select), `PublishedAt`(date), `Tags`(multi_select), `Cover`(files), `CoverAlt`(rich_text)
   - `Content` 속성은 없어도 됨 (본문은 페이지 내부 블록에서 수집)
3. 실행
   - `npm run sync:blog-spike`
4. 확인
   - Supabase `public.posts`에 row upsert
   - `content_markdown`의 이미지 URL이 Supabase Storage public URL로 치환됨
