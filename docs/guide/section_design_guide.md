# Section Design Guide (Template)

<!--
이 문서는 Figma 스태틱 화면만으로 부족한 정보를 채우기 위한 템플릿입니다.
작성 원칙:
1) 추상적인 표현보다 수치/규칙/예시를 적어주세요.
2) "기본값(default)"을 먼저 쓰고, 예외 케이스를 나중에 추가하세요.
3) 확정되지 않은 항목은 "TBD"로 남기되, 결정 예정 날짜/담당자를 같이 적어주세요.
-->

## 0) 문서 메타
- 페이지명: LP/MAX/00-page-root
- 버전: 1.0.0
- 작성일: 2026-02-14
- 작성자: Phil
- 관련 Figma 링크: https://www.figma.com/design/n9vwjmVf6yNID1cQy4tGPH/Max-Product-Design?node-id=1477-272&t=xsO3hE7IUa3oQ4Lv-4
- 대상 섹션 범위: (예: `LP/MAX/01-header` ~ `LP/MAX/09-footer`)

---

## 1) 공통 규칙 (페이지 전역)

### 1.1 디자인 토큰
- 색상 토큰:
    - background : #111113
    - border : #2F2F2F
    - white : #ffffff
    - primary : #111113
    - secondary : #858585
- 타이포 토큰:
- 간격/라운드/보더 토큰:

<!--
Tip for Codex:
- "대충 어두운 회색" 대신 "#111113 / border #2f2f2f"처럼 명시하면 정확도가 올라갑니다.
-->

### 1.2 반응형 브레이크포인트
- Mobile:
- Tablet:
- Desktop:
- Max width:

### 1.3 접근성/시맨틱
- 헤딩 구조 규칙:
- 버튼/링크 규칙:
- 이미지 alt 규칙:
- 대비/키보드 포커스 규칙:

### 1.4 모션/인터랙션 공통
- 전환 시간:
- 이징:
- hover/active/focus 규칙:
- 스크롤 애니메이션 사용 여부:

---

## 2) 섹션별 상세 스펙

<!--
아래 블록을 섹션마다 복제해서 채워주세요.
섹션명은 Figma 네이밍과 동일하게 유지하면 매핑이 가장 정확합니다.
-->

## [SECTION] LP/MAX/00-example

### A. 목적/메시지
- 이 섹션의 1문장 목적:
- 사용자에게 기대하는 행동:

### B. 콘텐츠
- 타이틀:
- 본문:
- 보조 문구:
- 버튼/링크 라벨:

### C. 레이아웃
- Desktop 레이아웃:
- Mobile 레이아웃:
- 정렬 기준:
- 최소/최대 높이:

### D. 컴포넌트 구조
- 사용 컴포넌트 목록: (예: `btn-primary`, `card-feature`)
- 반복 개수:
- 우선 재사용 컴포넌트:

### E. 상태(State)
- default:
- hover:
- active:
- disabled:
- loading/empty/error:

<!--
Tip for Codex:
- 상태가 없으면 "없음"이라고 써주세요.
- 비어 있으면 제가 임의 추론하게 되어 구현 일관성이 떨어집니다.
-->

### F. 인터랙션/플로우
- 클릭 시 동작:
- 외부 이동 URL:
- 새 탭 여부:
- 스크롤 연동 여부:

### G. 계측(Analytics)
- 이벤트명:
- 파라미터:
- 중복 전송 방지 규칙:

### H. 구현 우선순위
- Must:
- Should:
- Could:
- 이번 스프린트 제외 항목:

### I. QA 체크포인트
- 픽셀 검수 기준:
- 반응형 검수 기준:
- 접근성 검수 기준:

---

## 3) CTA 정책 (필수)
- 메인 CTA URL:
- 섹션별 CTA 위치 키: (예: `hero`, `sticky`, `footer`)
- 클릭 후 동작:
- 추적 이벤트:

---

## 4) 미정 항목 (TBD)
- 항목:
- 의사결정자:
- 결정 예정일:

---

## 5) 변경 이력
- YYYY-MM-DD:

<!--
Codex Interpretation Guide:
- 문서에서 "Must/Should/Could"를 우선순위로 사용합니다.
- 숫자/토큰/이벤트 명세가 명확할수록 코드 자동생성 정확도가 올라갑니다.
- Figma 노드명과 동일한 섹션명을 쓰면 구현 속도가 가장 빠릅니다.
-->

---

## 6) 샘플 작성 예시 (LP/MAX/01-header)

## [SECTION] LP/MAX/01-header

### A. 목적/메시지
- 이 섹션의 1문장 목적: 사용자가 페이지 어디에 있든 핵심 이동과 데모 CTA에 즉시 접근할 수 있게 한다.
- 사용자에게 기대하는 행동: `맥스 데모 신청하기` 클릭 또는 상단 메뉴로 해당 섹션 이동.

### B. 콘텐츠
- 타이틀: 로고 파일 이름 "header-logo.svg" (public 폴더에 있음)
- 본문: 없음
- 보조 문구: 없음
- 버튼/링크 라벨:
  - `Hey Max!`
  - `맥스의 기능`
  - `맥스의 가격`
  - `맥스 데모 신청하기`

### C. 레이아웃
- Desktop 레이아웃: 헤더는 full width, 좌측 로고 + 중앙 메뉴 pill
- Mobile 레이아웃: 로고만 노출 (메뉴/CTA 숨김)
- 정렬 기준: 수직 중앙 정렬, 헤더 좌우 패딩 `40px`
- 최소/최대 높이: 헤더 높이 `64px`, 화면 상단에서 `40px` 오프셋(`top: 40px`)

### D. 컴포넌트 구조
- 사용 컴포넌트 목록: `header-logo`, `header-menu-row`, `btn-menu`, `btn-primary`
- 반복 개수: `btn-menu` 3개
- 우선 재사용 컴포넌트: `btn-primary`

### E. 상태(State)
- default: 반투명 배경 `rgba(17,17,19,0.7)`, border `#2f2f2f`, 텍스트 `#898989`
- hover: 메뉴 텍스트 `#ffffff`, 배경 `rgba(255,255,255,0.06)`
- active: 미사용
- disabled: 미사용
- loading/empty/error: 미사용

### F. 인터랙션/플로우
- 클릭 시 동작:
  - 메뉴 1: `#hero`로 부드러운 스크롤 이동
  - 메뉴 2: `#features-focus`로 부드러운 스크롤 이동
  - 메뉴 3: `#cta`로 부드러운 스크롤 이동
  - CTA: Google Form 새 탭 이동
- 외부 이동 URL: `GOOGLE_FORM_URL` 상수 사용
- 새 탭 여부: CTA만 새 탭 (`target="_blank"`)
- 스크롤 연동 여부: 섹션 active 동기화 미사용 (hover 상태만 사용)

### G. 계측(Analytics)
- 이벤트명:
  - `cta_click`
  - `nav_click`
- 파라미터:
  - `cta_click`: `cta_location=header`, `cta_label=맥스 데모 신청하기`
  - `nav_click`: `nav_target=hero|features|cta`
- 중복 전송 방지 규칙: 클릭 1회당 1회 전송 (throttle 없음)

### H. 구현 우선순위
- Must:
  - 고정 헤더
  - CTA 동작 + `cta_click` 이벤트
  - Desktop/Mobile 노출 규칙
- Should:
  - 메뉴 active 상태 동기화
- Could:
  - 스크롤 시 헤더 배경 blur 강도 조절
- 이번 스프린트 제외 항목:
  - 햄버거 메뉴 오픈 패널 (모바일 확장 메뉴)

### I. QA 체크포인트
- 픽셀 검수 기준:
  - 헤더 상단 오프셋 `40px`
  - 좌우 패딩 `40px`
  - 높이 `64px`
  - 메뉴 pill 중앙 정렬
  - 메뉴 pill radius 최대값(rounded-full)
- 반응형 검수 기준:
  - `md` 미만에서 메뉴 숨김
  - CTA 클릭 가능 영역 최소 `40px` 이상
- 접근성 검수 기준:
  - 키보드 탭 이동 가능
  - 포커스 링 표시
  - 링크/버튼 역할 구분
  - 메뉴 클릭 시 섹션 부드러운 스크롤 동작 확인

---

## 7) 샘플 사용법
- 위 `LP/MAX/01-header` 블록을 복사해 섹션명만 바꾸고 채우면 됩니다.
- 권장 순서:
1. `LP/MAX/02-hero`
2. `LP/MAX/03-social-proof`
3. `LP/MAX/04-features-focus`
4. `LP/MAX/05-features-workflow`
5. `LP/MAX/08-cta`
6. `LP/MAX/09-footer`

---

## 8) 1차 작성본 (Codex Draft)

<!--
이 섹션은 Figma + 현재 코드 구조를 기준으로 작성한 초안입니다.
원하시면 아래 값만 수정하고, 템플릿 본문은 그대로 유지해도 됩니다.
-->

## 0) 문서 메타 (Draft)
- 페이지명: Max Product Landing Page
- 버전: v0.1-draft
- 작성일: 2026-02-14
- 작성자: Codex (1차), Choi (리뷰/수정)
- 관련 Figma 링크: `https://www.figma.com/design/n9vwjmVf6yNID1cQy4tGPH/Max-Product-Design?node-id=1477-272&t=mcmuPEO0w3DIng8x-4`
- 대상 섹션 범위: `LP/MAX/01-header` ~ `LP/MAX/08-footer`

## 1) 공통 규칙 (Draft)

### 1.1 디자인 토큰
- 색상 토큰:
  - 배경 기본: `#07080D` (페이지 배경)
  - 텍스트 기본: `#FFFFFF`
  - 텍스트 보조: `#A0A0A0` ~ `#B3B3B3`
  - 보더: `#1F2025` ~ `#2F2F2F`
- 타이포 토큰:
  - Display/H1: `48~64 / 700 / tight`
  - H2: `32~40 / 700`
  - Body: `16~18 / 400~500`
  - Caption: `12~14 / 400`
- 간격/라운드/보더 토큰:
  - 섹션 간격: `mt-24`(96) 또는 `mt-28`(112)
  - 컨테이너 최대폭: `1024px`
  - 카드 라운드: `24px`(핵심 카드), `9999px`(pill)

### 1.2 반응형 브레이크포인트
- Mobile: `0~767px`
- Tablet: `768~1023px`
- Desktop: `1024px+`
- Max width: `1024px` (콘텐츠), viewport는 full width

### 1.3 접근성/시맨틱
- 헤딩 구조 규칙: 페이지 내 `h1` 1개(히어로), 각 섹션 제목은 `h2`
- 버튼/링크 규칙: 외부 링크는 새 탭 + `rel="noopener noreferrer"`
- 이미지 alt 규칙: 의미 있는 이미지는 설명형 alt, 장식 이미지는 빈 alt
- 대비/키보드 포커스 규칙: 본문 텍스트 대비 4.5:1 이상, focus ring 필수

### 1.4 모션/인터랙션 공통
- 전환 시간: `180~240ms`
- 이징: `ease-out`
- hover/active/focus 규칙: hover에서 명도 +8~12%, focus ring 노출
- 스크롤 애니메이션 사용 여부: 초기에는 미적용(정적 우선)

## [SECTION] LP/MAX/02-hero

### A. 목적/메시지
- 이 섹션의 1문장 목적: 서비스 가치 제안을 한 화면에서 명확히 전달하고 데모 신청으로 유도한다.
- 사용자에게 기대하는 행동: `맥스 데모 신청하기` 클릭.

### B. 콘텐츠
- 타이틀: `성장하는 브랜드를 위한 회전일수 기반 / 인공지능 재고 운영 솔루션`
- 본문: `맥스와 함께 재고 낭비는 줄이고 마진은 개선하고 / 매출은 최대화하세요`
- 보조 문구: `맥스 AI 사용법 무료 교육`
- 버튼/링크 라벨: `맥스 데모 신청하기`

### C. 레이아웃
- Desktop 레이아웃: 중앙 정렬, 상단 보조 문구 -> 타이틀 -> 본문 -> CTA 수직 스택
- Mobile 레이아웃: 동일 구조, 타이틀 줄바꿈 재조정
- 정렬 기준: 가로 중앙 정렬
- 최소/최대 높이: `pt-36(md:pt-44)` 기준 상단 여백 확보

### D. 컴포넌트 구조
- 사용 컴포넌트 목록: `hero-badge`, `hero-title`, `hero-description`, `btn-primary`
- 반복 개수: 없음
- 우선 재사용 컴포넌트: `btn-primary`

### E. 상태(State)
- default: 정적
- hover: CTA hover만 적용
- active: CTA active만 적용
- disabled: CTA 비활성 미사용
- loading/empty/error: 미사용

### F. 인터랙션/플로우
- 클릭 시 동작: CTA 클릭 시 외부 신청 폼 이동
- 외부 이동 URL: `GOOGLE_FORM_URL`
- 새 탭 여부: 예
- 스크롤 연동 여부: 아니오

### G. 계측(Analytics)
- 이벤트명: `cta_click`
- 파라미터: `cta_location=hero`, `cta_label=맥스 데모 신청하기`
- 중복 전송 방지 규칙: 클릭 1회당 1회

### H. 구현 우선순위
- Must: 텍스트/CTA/레이아웃
- Should: 문장 줄바꿈 피그마와 유사하게 유지
- Could: 배경 장식 애니메이션
- 이번 스프린트 제외 항목: A/B 카피 테스트

### I. QA 체크포인트
- 픽셀 검수 기준: `1024px` 기준 타이틀 줄바꿈 일치
- 반응형 검수 기준: 모바일에서 CTA first viewport 내 노출
- 접근성 검수 기준: `h1` 1개 유지, CTA 키보드 접근 가능

## [SECTION] LP/MAX/03-social-proof

### A. 목적/메시지
- 이 섹션의 1문장 목적: 신뢰 가능한 고객/브랜드 이미지를 빠르게 전달한다.
- 사용자에게 기대하는 행동: 브랜드 로고를 보고 서비스 신뢰도 확보.

### B. 콘텐츠
- 타이틀: `Trusted by industry leaders`
- 본문: 없음
- 보조 문구: 없음
- 버튼/링크 라벨: 없음

### C. 레이아웃
- Desktop 레이아웃: 제목 + 로고 가로열
- Mobile 레이아웃: 로고 2~3열 래핑 또는 슬라이드
- 정렬 기준: 중앙 정렬
- 최소/최대 높이: 콘텐츠 기준 자동

### D. 컴포넌트 구조
- 사용 컴포넌트 목록: `social-proof-title`, `logo-row`, `logo-item`
- 반복 개수: 로고 개수만큼 반복
- 우선 재사용 컴포넌트: `logo-item`

### E. 상태(State)
- default: 정적
- hover: 로고 hover 시 opacity 100%
- active: 없음
- disabled: 없음
- loading/empty/error: 로고 데이터 없으면 섹션 숨김

### F. 인터랙션/플로우
- 클릭 시 동작: 기본 없음 (링크형 로고 확정 시 추가)
- 외부 이동 URL: TBD
- 새 탭 여부: TBD
- 스크롤 연동 여부: 아니오

### G. 계측(Analytics)
- 이벤트명: `logo_click` (링크형일 때만)
- 파라미터: `logo_name`
- 중복 전송 방지 규칙: 클릭 1회당 1회

### H. 구현 우선순위
- Must: 제목 + 로고 행
- Should: 모바일 대응
- Could: 무한 marquee
- 이번 스프린트 제외 항목: 동적 CMS 로고 관리

### I. QA 체크포인트
- 픽셀 검수 기준: 로고 높이 baseline 정렬
- 반응형 검수 기준: 모바일에서 로고 잘림 없음
- 접근성 검수 기준: 장식 로고는 빈 alt, 링크 로고는 설명 alt

## [SECTION] LP/MAX/04-features-focus

### A. 목적/메시지
- 이 섹션의 1문장 목적: 핵심 기능(리스크 모니터링/요약)을 시각적으로 설명한다.
- 사용자에게 기대하는 행동: 기능 가치 이해 후 하단 CTA로 이동.

### B. 콘텐츠
- 타이틀: `맥스와 대화로 업무 워크플로우를 만들고 / 반복 업무에서 벗어나세요`
- 본문: `업무 흐름을 MAX와 대화로 설계하세요...` (피그마 본문 사용)
- 보조 문구: 없음
- 버튼/링크 라벨: 없음

### C. 레이아웃
- Desktop 레이아웃: 상단 헤드라인 컬럼 + 하단 2카드 그리드
- Mobile 레이아웃: 세로 스택 (headline -> card-01 -> card-02)
- 정렬 기준: 컨테이너 중앙, 카드 내부 좌상단 정렬
- 최소/최대 높이: 콘텐츠 기준 자동

### D. 컴포넌트 구조
- 사용 컴포넌트 목록: `feature-focus-headline-column`, `feature-focus-card-grid`, `card-feature-focus-01`, `card-feature-focus-02`
- 반복 개수: 카드 2개
- 우선 재사용 컴포넌트: 공통 `feature-card`

### E. 상태(State)
- default: 정적 카드
- hover: 카드 hover 시 border/emphasis 소폭 강화
- active: 없음
- disabled: 없음
- loading/empty/error: 데이터형 UI는 mock 고정

### F. 인터랙션/플로우
- 클릭 시 동작: 기본 없음
- 외부 이동 URL: 없음
- 새 탭 여부: 없음
- 스크롤 연동 여부: 아니오

### G. 계측(Analytics)
- 이벤트명: `section_view`
- 파라미터: `section=features_focus`
- 중복 전송 방지 규칙: 세션당 1회

### H. 구현 우선순위
- Must: 헤드라인 + 2카드 구조 + 배경 분위기
- Should: 카드 내부 텍스트/칩 스타일 정밀 매칭
- Could: 배경 점/그라데이션 미세 애니메이션
- 이번 스프린트 제외 항목: 실데이터 연동

### I. QA 체크포인트
- 픽셀 검수 기준: 카드 라운드/간격/보더 톤
- 반응형 검수 기준: 모바일 스택 전환 시 순서 유지
- 접근성 검수 기준: 장식 요소 `aria-hidden` 처리

## [SECTION] LP/MAX/05-features-workflow

### A. 목적/메시지
- 이 섹션의 1문장 목적: 워크플로우 자동화 과정을 단계적으로 보여준다.
- 사용자에게 기대하는 행동: 자동화 플로우 이해 및 CTA 관심도 상승.

### B. 콘텐츠
- 타이틀: TBD (피그마 최종 카피 확정 필요)
- 본문: TBD
- 보조 문구: 카드 내부 단계/설명 문구
- 버튼/링크 라벨: 없음

### C. 레이아웃
- Desktop 레이아웃: 헤드라인 컬럼 + 워크플로우 카드/다이어그램
- Mobile 레이아웃: 카드 단위 세로 스택
- 정렬 기준: 좌측 정보, 우측 보조 설명
- 최소/최대 높이: 콘텐츠 기준 자동

### D. 컴포넌트 구조
- 사용 컴포넌트 목록: `feature-workflow-headline-column`, `feature-workflow-card-grid`, `card-feature-workflow-01`, `feature-workflow-what-row`
- 반복 개수: 단계 노드 반복
- 우선 재사용 컴포넌트: `workflow-node`, `chip`

### E. 상태(State)
- default: 정적
- hover: 노드 hover 강조(선택)
- active: 없음
- disabled: 없음
- loading/empty/error: 미사용

### F. 인터랙션/플로우
- 클릭 시 동작: 기본 없음
- 외부 이동 URL: 없음
- 새 탭 여부: 없음
- 스크롤 연동 여부: 아니오

### G. 계측(Analytics)
- 이벤트명: `section_view`
- 파라미터: `section=features_workflow`
- 중복 전송 방지 규칙: 세션당 1회

### H. 구현 우선순위
- Must: 단계 구조 시각화
- Should: 좌우 콘텐츠 균형/가독성
- Could: 단계 등장 애니메이션
- 이번 스프린트 제외 항목: 인터랙티브 편집 기능

### I. QA 체크포인트
- 픽셀 검수 기준: 카드/노드 정렬 및 선 연결감
- 반응형 검수 기준: 모바일에서 읽기 순서 명확
- 접근성 검수 기준: 단계 정보가 텍스트로도 이해 가능

## [SECTION] LP/MAX/07-pricecontact (코드 기준: `#cta`)

### A. 목적/메시지
- 이 섹션의 1문장 목적: 페이지 하단에서 문의 전환을 유도한다.
- 사용자에게 기대하는 행동: `문의하기` 버튼 클릭.

### B. 콘텐츠
- 타이틀: `맥스 AI에 대해 더 알고 싶으신가요? 연락주십시오.`
- 본문: 없음
- 보조 문구: 없음
- 버튼/링크 라벨: `문의하기`

### C. 레이아웃
- Desktop 레이아웃: 좌측 타이틀, 우측 CTA 버튼
- Mobile 레이아웃: 상단 타이틀, 하단 CTA
- 정렬 기준: 수직 중앙
- 최소/최대 높이: 콘텐츠 기준 자동

### D. 컴포넌트 구조
- 사용 컴포넌트 목록: `cta-title`, `btn-primary`
- 반복 개수: 없음
- 우선 재사용 컴포넌트: `btn-primary`

### E. 상태(State)
- default: 정적
- hover: 버튼 hover 강조
- active: 버튼 active
- disabled: 미사용
- loading/empty/error: 미사용

### F. 인터랙션/플로우
- 클릭 시 동작: 외부 문의 폼 이동
- 외부 이동 URL: `GOOGLE_FORM_URL`
- 새 탭 여부: 예
- 스크롤 연동 여부: 아니오

### G. 계측(Analytics)
- 이벤트명: `cta_click`
- 파라미터: `cta_location=bottom_cta`, `cta_label=문의하기`
- 중복 전송 방지 규칙: 클릭 1회당 1회

### H. 구현 우선순위
- Must: 카피 + CTA 동작
- Should: 모바일 줄바꿈 최적화
- Could: 버튼 아이콘
- 이번 스프린트 제외 항목: 다중 문의 채널 분기

### I. QA 체크포인트
- 픽셀 검수 기준: 제목/버튼 수평 정렬
- 반응형 검수 기준: 모바일에서 버튼 full width 여부 확인
- 접근성 검수 기준: 버튼 명확한 접근 가능 이름

## [SECTION] LP/MAX/08-footer

### A. 목적/메시지
- 이 섹션의 1문장 목적: 기본 회사 정보 및 연락처를 제공한다.
- 사용자에게 기대하는 행동: 필요 시 연락처 확인.

### B. 콘텐츠
- 타이틀: 없음
- 본문: `© Splash Corp.`, `Since 2022`
- 보조 문구: `alivesoultion@gmail.com`
- 버튼/링크 라벨: 이메일 링크(선택)

### C. 레이아웃
- Desktop 레이아웃: 가로 배치(회사 정보 / 연락처)
- Mobile 레이아웃: 세로 스택
- 정렬 기준: 하단 정렬, 작은 텍스트
- 최소/최대 높이: `py-6`

### D. 컴포넌트 구조
- 사용 컴포넌트 목록: `footer-meta`, `footer-contact`
- 반복 개수: 없음
- 우선 재사용 컴포넌트: 없음

### E. 상태(State)
- default: 정적
- hover: 이메일 링크 사용 시 hover underline
- active: 없음
- disabled: 없음
- loading/empty/error: 없음

### F. 인터랙션/플로우
- 클릭 시 동작: 이메일 링크일 경우 `mailto:`
- 외부 이동 URL: `mailto:alivesoultion@gmail.com` (선택)
- 새 탭 여부: 해당 없음
- 스크롤 연동 여부: 아니오

### G. 계측(Analytics)
- 이벤트명: `footer_contact_click` (메일 링크 사용 시)
- 파라미터: `contact_type=email`
- 중복 전송 방지 규칙: 클릭 1회당 1회

### H. 구현 우선순위
- Must: 회사/연락처 텍스트
- Should: 이메일 링크 처리
- Could: 법적 링크(개인정보처리방침)
- 이번 스프린트 제외 항목: 다국어 footer

### I. QA 체크포인트
- 픽셀 검수 기준: 상단 border 및 텍스트 컬러톤
- 반응형 검수 기준: 모바일 줄바꿈 시 정보 누락 없음
- 접근성 검수 기준: 링크 대비 및 포커스 표시

## 3) CTA 정책 (Draft)
- 메인 CTA URL: `GOOGLE_FORM_URL` (실제 URL 값 별도 env/constant 관리)
- 섹션별 CTA 위치 키: `header`, `hero`, `bottom_cta`
- 클릭 후 동작: 외부 폼 새 탭 이동
- 추적 이벤트: `cta_click`

## 4) 미정 항목 (TBD)
- 항목: `LP/MAX/06-*` 구간의 공식 섹션명/역할 정리 필요 (현재 일부 노드가 `feature-workflow-what-row` 단독)
- 의사결정자: Design Owner + Frontend Owner
- 결정 예정일: TBD
- 항목: `LP/MAX/07-pricecontact` vs 코드 id `cta` 네이밍 통일
- 의사결정자: Frontend Owner
- 결정 예정일: TBD
- 항목: social proof 로고 클릭 가능 여부/링크 정책
- 의사결정자: PO/Marketing
- 결정 예정일: TBD

## 5) 변경 이력 (Draft)
- 2026-02-14: Codex 1차 작성본 추가 (Figma node 기반)
