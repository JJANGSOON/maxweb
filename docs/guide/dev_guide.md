# MAX Web GUIDE (Living Document)

## 0) 이 문서 사용 규칙 (가장 중요)
- Codex는 작업 시작 전에 반드시 이 GUIDE.md를 읽고, 여기에 적힌 규칙/구조/정의를 최우선으로 따른다.
- 새로운 결정(예: 이벤트 추가, 섹션 이름 변경, 기술 스택 변경)이 생기면
  - 코드 수정과 함께 GUIDE.md도 업데이트한다.
- 작업은 작은 단위로 진행한다:
  1) 짧은 계획
  2) 코드 변경
  3) 변경 파일 목록
  4) localhost에서 확인 방법

---

## 1) 프로젝트 요약
- 제품명: MAX 웹사이트
- 프로젝트 성격: 마케팅 원페이지(랜딩 페이지)
- 1차 목표: CTA 클릭 → Google Form으로 이동(리드 확보)
- 인증(Auth): 사용하지 않음
- 스토리지(Storage): 사용하지 않음
- Supabase: **Phase 1에서는 사용하지 않음** (Phase 2에서 도입 예정)
- 배포: (예: Vercel) 추후 확정

---

## 2) 현재 단계(Phase) 정의
### Phase 1 (현재)
- 부킹/리드 수집은 **Google Form**으로 처리 (자체 폼 개발 X)
- GA4 트래킹이 핵심:
  - CTA 클릭 이벤트
  - 섹션 도달(스크롤) 이벤트
  - 스크롤 깊이 이벤트(25/50/75/100)

### Phase 2 (추후)
- Google Form → 자체 부킹 폼 전환
- Supabase DB + Edge Functions로 리드 저장/알림 자동화
- 이메일 발송/알림(디스코드 등) 연동

---

## 3) 기술 스택
- Framework: Next.js (App Router)
- Package manager: npm
- Styling: (선택)
  - Option A: Tailwind CSS
  - Option B: CSS Modules
- Analytics: GA4

---

## 4) 레포 구조(목표 구조)
Figma 섹션 구조가 코드에서도 그대로 드러나도록 구성한다.

권장 구조:
- app/
  - layout.tsx
  - page.tsx
  - globals.css
- components/
  - sections/   (Hero, Features 등 섹션 단위)
  - ui/         (Button, Container, Card 등 재사용 컴포넌트)
- lib/
  - analytics.ts   (GA 이벤트/유틸 정의는 여기만)
  - constants.ts   (문구/URL/외부 링크 등 상수는 여기만)
- public/
  - images/

규칙:
- 섹션 컴포넌트는 `components/sections/*`에만 만든다.
- 재사용 UI는 `components/ui/*`로 승격한다.
- 문구/링크/구글폼 URL은 `lib/constants.ts` 한 군데에서만 관리한다.
- GA 이벤트 전송 로직은 `lib/analytics.ts` 한 군데에서만 관리한다.

---

## 5) Figma (Source of Truth)
- 구현은 Figma MCP로 프레임을 조회하고 디자인과 최대한 동일하게 만든다.
- 네이밍/레이어 규칙은 `docs/guide/figma_guide.md`를 따른다.
- 섹션별 구현 스펙은 `docs/guide/section_design_guide.md`를 따른다.
- Figma 파일 URL: (여기에 붙여넣기)
- 최상위 프레임/섹션 네이밍(권장):
  - LP/MAX/01-Hero
  - LP/MAX/02-SocialProof
  - LP/MAX/03-Problem
  - LP/MAX/04-Solution
  - LP/MAX/05-HowItWorks
  - LP/MAX/06-Features
  - LP/MAX/07-FAQ
  - LP/MAX/08-CTA
  - LP/MAX/09-Footer

※ 실제 네이밍이 다르면 아래에 “실제 프레임 이름”을 적는다:
- (예: MAX Landing / Hero)
- (예: MAX Landing / Features)
- ...

---

## 6) 디자인 → 코드 규칙
- 반응형 필수: Mobile(360) + Desktop(1440)
- 8pt spacing grid 기반
- 시맨틱 HTML + 접근성 준수:
  - 버튼은 반드시 `<button>`
  - 헤딩은 h1 → h2 → h3 계층 유지
  - 이미지 alt 텍스트 포함
- 가능한 경우 토큰/CSS 변수로 정리한다(색상/타입/spacing)

---

## 7) CTA / Google Form 정책
- Google Form URL: (여기에 붙여넣기)
- CTA 동작: **새 탭으로 열기**(target=_blank) + GA 이벤트 전송 후 이동
- CTA 위치(이벤트 파라미터로 구분):
  - hero
  - sticky
  - footer

---

## 8) GA4 설정 및 이벤트 스펙
- GA4 Measurement ID: (G-XXXXXXXXXX)

### 필수 이벤트
1) `cta_click`
- params:
  - cta_location: hero | sticky | footer
  - cta_label: string

2) `section_view` (섹션 도달)
- params:
  - section: hero | features | how_it_works | faq | cta | footer (실제 섹션 기준)
- 정책:
  - 페이지 로드 당 섹션별 1회만 전송(중복 방지)
- 구현:
  - IntersectionObserver 사용 권장

3) `scroll_depth`
- params:
  - percent: 25 | 50 | 75 | 100
- 정책:
  - 임계치별 1회만 전송(중복 방지)

---

## 9) 개발/실행 커맨드
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Start: `npm start`

---

## 10) 변경 로그(중요 결정 기록)
- 2026-02-13: GUIDE 최초 생성 (Phase 1: Google Form + GA)
- YYYY-MM-DD: ...
