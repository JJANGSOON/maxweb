# Blog SEO Guide

## 목적
- Notion -> Supabase -> 웹사이트 블로그 파이프라인에서 SEO 누락 없이 발행하기 위한 최소 운영 기준을 정의한다.

## 1) Notion DB 필수 필드
- `Name` (Title): 글 제목
- `Slug` (Text): URL 경로 값 (예: `blog-inventory`)
- `Summary` (Text): 메타 description 기본값
- `Status` (Select): `draft` | `published`
- `PublishedAt` (Date): 발행일
- `Cover` (Files & media): 대표 이미지 (OG 기본 이미지)

## 2) 선택 필드 (고급 SEO)
- `SeoTitle` (Text): 탭 제목/검색 제목을 본문 제목과 다르게 운영할 때
- `SeoDescription` (Text): 검색 설명을 별도 운영할 때
- `OgImage` (Files & media or URL): SNS 공유용 이미지를 별도 운영할 때

운영 원칙:
- 선택 필드가 비어있으면 아래 순서로 fallback 한다.
1. `SeoTitle` 없으면 `Name` 사용
2. `SeoDescription` 없으면 `Summary` 사용
3. `OgImage` 없으면 `Cover` 사용

## 3) 페이지 메타데이터 적용 기준 (Next.js)
- 상세 페이지(`app/blog/[slug]/page.tsx`)에서 `generateMetadata` 사용
- 필수 메타:
  - `title`
  - `description`
  - `openGraph.title`
  - `openGraph.description`
  - `openGraph.images`
  - `twitter.card` (`summary_large_image`)
  - `alternates.canonical`

## 4) 사이트 레벨 SEO
- `app/sitemap.ts`: published 글의 slug를 모두 포함
- `app/robots.ts`: 기본 크롤링 허용 및 sitemap 경로 명시

## 5) Slug 운영 규칙 (중요)
- `Slug`는 발행 후 **고정값**으로 운영한다.
- 의미:
  - 기존 URL을 바꾸지 않는다.
  - 예: `/blog/blog-inventory`를 발행 후 `/blog/inventory-ai`로 임의 변경하지 않는다.
- 이유:
  - 검색엔진 인덱스 분산 방지
  - 외부 공유 링크/백링크 깨짐 방지
  - 중복 페이지 생성 리스크 감소
- 부득이하게 변경 시:
  - 301 redirect를 반드시 설정한다.

## 6) 구조화 데이터(Structured Data) 기준
- 구조화 데이터는 Notion DB 컬럼이 아니라, 웹페이지에서 JSON-LD로 렌더링한다.
- 상세 페이지에 `BlogPosting` 스키마를 삽입한다.
- 기본 매핑:
  - `headline` <- Name
  - `description` <- Summary
  - `datePublished` <- PublishedAt
  - `dateModified` <- updated_at
  - `image` <- OgImage or Cover
  - `author.name` <- 고정값 `MAX Team`
  - `mainEntityOfPage` <- canonical URL

정리:
- 구조화 데이터용으로 Notion에 별도 컬럼을 반드시 추가할 필요는 없다.
- 현재 필드만으로도 구현 가능하다.

## 7) 발행 체크리스트
1. Notion에서 `Name/Slug/Summary/Status/PublishedAt/Cover` 확인
2. `Status = published` 변경
3. sync 실행
4. 상세 페이지 메타/OG 이미지 확인
5. sitemap에 URL 노출 확인
6. 공유 미리보기(카카오/슬랙/디스코드) 확인
