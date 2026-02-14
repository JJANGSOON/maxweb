# Share Preview Guide (Template)

<!--
이 문서는 링크 공유 시 노출되는 미리보기(OG/Twitter Card) 설정을 정리하는 템플릿입니다.
작성 원칙:
1) 텍스트는 "최종 문구"를 적고, 후보 문구는 별도 섹션에 분리하세요.
2) 이미지는 반드시 파일 경로 + 해상도(px) + 용량(KB)을 함께 기록하세요.
3) 확정 전 항목은 TBD로 남기고, 담당자/결정일을 같이 적어주세요.
-->

## 0) 문서 메타
- 버전: 1.0.0
- 작성일: 2026-02-14
- 작성자: Phil
- 대상 도메인: `https://getmax.kr`
- 대상 페이지:
  - 홈: `/`
  - 기타 랜딩/서브 페이지: TBD

---

## 1) 기본 정책 (필수)
- Canonical URL: `https://getmax.kr`
- 기본 언어: `ko_KR`
- 사이트명: `MAX`
- 인덱싱 정책: `index,follow`

<!--
Tip for Codex:
- Canonical이 없으면 공유/검색에서 URL 중복 이슈가 생길 수 있습니다.
- URL은 반드시 https 기준으로 적어주세요.
-->

---

## 2) 공유 미리보기 텍스트 스펙

### 2.1 Open Graph (카카오톡/슬랙/디스코드/페이스북 등)
- `og:title`: MAX AI
- `og:description`: 성장하는 브랜드를 위한 회전일수 기반 인공지능 재고 운영 솔루션
- `og:url`: `https://getmax.kr`
- `og:site_name`: MAX
- `og:locale`: `ko_KR`
- `og:type`: `website`
- `og:image` (절대경로): `https://getmax.kr/meta.png`
- `og:image:width`: 1200
- `og:image:height`: 630
- `og:image:alt`: MAX AI 재고 운영 솔루션 공유 썸네일

### 2.2 Twitter Card (X)
- `twitter:card`: `summary_large_image`
- `twitter:title`: MAX AI
- `twitter:description`: 성장하는 브랜드를 위한 회전일수 기반 인공지능 재고 운영 솔루션
- `twitter:image` (절대경로): `https://getmax.kr/meta.png`
- `twitter:image:alt`: MAX AI 재고 운영 솔루션 공유 썸네일

<!--
Tip for Codex:
- 제목은 20~40자, 설명은 45~90자 범위를 권장합니다.
- 플랫폼마다 줄임 처리 방식이 달라서 짧고 강한 문구가 안전합니다.
-->

---

## 3) 썸네일 이미지 스펙
- 최종 파일명: meta.png
- 저장 위치: `public/meta.png`
- 해상도: `1200x630`
- 포맷: `png`
- 용량: TBD (권장 300KB 이하)
- 배경색/브랜드 컬러: `#111113` 베이스 + 브랜드 포인트 컬러
- 텍스트 포함 여부: 포함
- 텍스트 안전영역: 좌우 80px / 상하 60px

### 3.1 이미지 변형본 (선택)
- 카카오 전용:
- 트위터 전용:
- 라이트/다크 버전:

<!--
Tip for Codex:
- 이미지가 너무 무거우면 미리보기 반영이 늦거나 실패할 수 있습니다.
- URL이 변경되면 캐시 갱신용 쿼리(`?v=2`) 전략을 같이 기록하세요.
-->

---

## 4) 페이지별 매핑

## [PAGE] /
- 목적: MAX 서비스 메인 랜딩 유입/소개
- `title`: MAX | AI 재고 운영 솔루션
- `description`: 성장하는 브랜드를 위한 회전일수 기반 인공지능 재고 운영 솔루션
- `og:image`: `https://getmax.kr/meta.png`
- `twitter:image`: `https://getmax.kr/meta.png`

## [PAGE] /pricing
- 목적: TBD
- `title`: TBD
- `description`: TBD
- `og:image`: TBD
- `twitter:image`: TBD

<!--
필요한 페이지 수만큼 [PAGE] 블록을 복제해 사용하세요.
-->

---

## 5) 구현 체크리스트 (Next.js 기준)
- `app/layout.tsx`에 기본 `metadata` 설정
- 페이지별 `metadata` override 여부 확인
- OG/Twitter image URL 절대경로 처리
- favicon/icon과 충돌 없는지 확인
- 배포 도메인 기준 canonical/og:url 확인

---

## 6) 검수/QA 체크리스트
- 카카오톡 링크 공유 미리보기 확인
- 슬랙 링크 공유 미리보기 확인
- 디스코드 링크 공유 미리보기 확인
- Facebook Sharing Debugger 확인
- Twitter Card Validator 확인
- 제목/설명 줄임 여부 확인
- 썸네일 잘림/텍스트 가독성 확인

---

## 7) 캐시 갱신 전략
- 이미지 파일명 버전 규칙: `meta-v{n}.png` (예: `meta-v2.png`)
- 메타 업데이트 시 버전 증가 방식: 이미지 교체 시 파일명을 증가시키고 메타의 image URL도 함께 변경
- 플랫폼 캐시 강제 갱신 방법:
  - Facebook: Sharing Debugger에서 재스크랩
  - X(Twitter): Card Validator 재요청
  - 카카오/슬랙: URL 뒤에 쿼리 버전(`?v=2`)으로 신규 링크 공유

---

## 8) 미정 항목 (TBD)
- 항목: `/pricing` 페이지 메타 확정
- 담당자: Phil
- 결정 예정일: TBD

---

## 9) 변경 이력
- 2026-02-14: 첫 작업
- 2026-02-14: 기본 OG/Twitter 값 및 홈 페이지 매핑 초안 입력

<!--
Codex Interpretation Guide:
- 절대 URL, 해상도, 파일 경로가 명확할수록 자동 반영 정확도가 올라갑니다.
- "좋아 보이게" 같은 표현보다 수치(글자수, px, KB)를 우선으로 적어주세요.
-->
