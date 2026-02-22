# Blog Writer Guide

이 문서는 **블로그 작성자(에디터)**를 위한 운영 가이드입니다.  
개발 구현 기준(렌더링/SEO/공유 카드/발행 프로세스)을 작성 단계에서 바로 반영할 수 있도록 정리했습니다.

---

## 1) 작성 목적
- 글이 웹사이트에 깨지지 않고 동일한 스타일로 노출되게 한다.
- 검색/공유(카카오, 슬랙, 디스코드) 미리보기가 안정적으로 나오게 한다.
- 발행 후 URL/메타/카드 품질 이슈를 최소화한다.

---

## 2) 필수 입력값 (Notion 기준)
- `Name` (Title): 글 제목
- `Slug` (Text): URL 경로
- `Summary` (Text): 요약/메타 설명
- `Status` (Select): `draft` | `published`
- `PublishedAt` (Date): 발행일
- `Cover` (Files & media): 대표 이미지
- `CoverAlt` (Text): 대표 이미지 대체텍스트
- `Tags` (Multi-select): 태그

---

## 3) 필드 작성 규칙 (중요)

### 3.1 Slug
- 소문자 + 하이픈(`-`) 권장
- 예: `blog-inventory` 또는 `inventory` 소문자로만
- **발행 후 변경 금지** (링크/SEO/공유 깨짐 방지)

### 3.2 Summary
- 글 핵심을 문장으로 작성 
- 공유 카드/검색 설명에 사용됨

### 3.3 Cover / CoverAlt
- Cover: 글 대표 이미지
- CoverAlt: 이미지 의미를 설명하는 문장
- 예: `MAX 대시보드에서 재고 리스크를 확인하는 화면`
- 목적 : SEO

### 3.4 Tags
- 화면 노출은 최대 3개 (그 이상 추가해도 안보임)
- 너무 일반적인 태그보다 글 맥락이 드러나는 태그 권장

---

## 4) 본문 문법 가이드 (현재 렌더러 기준)

### 4.1 제목
- 대제목/섹션 제목: `## 제목` (노션에서 heading 1)
- 소제목: `### 제목`. (노션에서 heading 3)

### 4.2 문단/리스트
- 일반 문단: 일반 텍스트
- 불릿: `- 항목`
- 숫자 리스트: 사용안하는게 맞음. 노션에서 작성해도 넘어올대 트리구조 깨지는 현상 있음

### 4.3 이미지
- 노션에 image upload 로 올려야 함. 링크 갖다 붙히면 몇일 뒤 깨지는 현상 있음.
- GIF는 별도 스타일로 노출됨 (일반 이미지와 다름), width : 240px 고정으로 보여짐.

### 4.4 영상 (YouTube)
- `watch`, `youtu.be`, `shorts` 형식 모두 처리됨

---

## 5) SEO/공유 카드 매핑 (작성자가 알아야 할 핵심)
- `post.title` <- `Name`
- `post.summary` <- `Summary`
- `post.cover_image_url` <- `Cover`
- `post.cover_alt` <- `CoverAlt`

- Open Graph:
  - `og:title` = `post.title`
  - `og:description` = `post.summary`
  - `og:url` = 블로그 URL
  - `og:image` = `post.cover_image_url`
  - `og:image:alt` = `post.cover_alt`

- Twitter Card:
  - Open Graph와 동일 값 사용

상세 규칙 문서:
- `docs/guide/share_preview_guide.md`
- `docs/guide/blog_seo_guide.md`

---

## 6) 발행 전 체크리스트
- [ ] 제목/요약이 최종 문구인지 확인
- [ ] Slug 오탈자 없는지 확인
- [ ] Cover 이미지/Alt 입력 확인
- [ ] 헤딩(`##`, `###`) 구조 확인
- [ ] 링크 깨짐 여부 확인
- [ ] 모바일에서 가독성 확인
- [ ] 태그가 의도대로 보이는지 확인(최대 3개)
- [ ] `Status = published` (status 가 `draft` 면  프로덕션 레벨에서 노출이 안됨.)
- [ ] `PublisehdAt` = 날짜를 꼭 지정해줘야 함. 블로그 카드나 상세 페이지에 필수 노출되는 정보중 하나임.

---

## 7) 발행 절차
1. Notion에서 글 작성/수정 (draft 모드에서 충분히 작성 및 수정)
2. 필수 필드 점검
3. 동기화 실행
   - `npm run sync:blog-spike` (요건 @phil 에게 요청 그러나 Daily sync acion 으로 매일 하루에 한번 우리 슈파베이스 DB로 복사함.)
4. 웹에서 상세/목록 확인
5. 공유 미리보기 확인 (카카오/슬랙/디스코드)

---

## 8) 자주 발생하는 실수
- Slug를 발행 후 변경함
- Summary를 비워서 공유 카드 설명이 약해짐
- CoverAlt 미입력
- 본문에 비표준 문법 사용 (`####` 남용, 깨진 링크 등)
- YouTube 링크를 일반 텍스트로 넣어 임베드가 안 됨

---

## 9) 문의/수정 원칙
- 스타일/렌더링 이슈는 캡처 + URL + 해당 문단 원문을 함께 전달
- 작성 규칙 변경 필요 시 먼저 본 문서와 SEO/공유 가이드를 같이 업데이트
