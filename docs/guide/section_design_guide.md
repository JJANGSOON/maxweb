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
    - hero background dot : #464646
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
  - 메뉴 row 높이: `56px`
  - 메뉴 버튼 높이: `32px`
  - 헤더 CTA 높이: `32px`

### D. 컴포넌트 구조
- 사용 컴포넌트 목록: `header-logo`, `header-menu-row`, `btn-menu`, `btn-primary`
- 반복 개수: `btn-menu` 3개
- 우선 재사용 컴포넌트: `btn-primary`

### E. 상태(State)
- default: 반투명 배경 `rgba(17,17,19,0.7)`, border `#2f2f2f`, 텍스트 `#858585`
- hover: 메뉴 텍스트 `#ffffff`, 배경 `rgba(255,255,255,0.06)`
- active: 미사용
- disabled: 미사용
- loading/empty/error: 미사용

### F. 인터랙션/플로우
- 클릭 시 동작:
  - 로고 클릭: 페이지 맨 위로 부드러운 스크롤 이동
  - 메뉴 1: `#heymax`로 부드러운 스크롤 이동
  - 메뉴 2: `#features-focus`로 부드러운 스크롤 이동
  - 메뉴 3: `#cta`로 부드러운 스크롤 이동
  - CTA: Google Form 새 탭 이동
- 외부 이동 URL: `https://forms.gle/GonphchicsGY6aVB8`
- 새 탭 여부: CTA만 새 탭 (`target="_blank"`)
- 스크롤 연동 여부: 섹션 active 동기화 미사용 (hover 상태만 사용)

### G. 계측(Analytics)
- 이벤트명:
  - `cta_click`
  - `nav_click`
- 파라미터:
  - `cta_click`: `cta_location=header`, `cta_label=맥스 데모 신청하기`
  - `nav_click`: `nav_target=heymax|features|cta`
- 중복 전송 방지 규칙: 클릭 1회당 1회 전송 (throttle 없음)

### H. 구현 우선순위
- Must:
  - 고정 헤더
  - CTA 동작 + `cta_click` 이벤트
  - Desktop/Mobile 노출 규칙
- Should:
  - 메뉴 클릭 시 부드러운 스크롤
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
- 현재 구현 정책: 데스크탑 우선(모바일 미구현)
- Desktop: `1024px` 콘텐츠 폭 기준으로 화면 축소 대응
- Mobile: 추후 모바일 전용 디자인 확정 후 별도 구현
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
- 보조 문구: 없음 (삭제됨)
- 버튼/링크 라벨: `맥스 데모 신청하기`

### C. 레이아웃
- Desktop 레이아웃: 중앙 정렬, 타이틀 -> 본문 -> CTA 수직 스택
- Mobile 레이아웃: 동일 구조, 타이틀 줄바꿈 재조정
- 정렬 기준: 가로 중앙 정렬
- 최소/최대 높이: `pt-36(md:pt-[266px])` 기준 상단 여백 확보
  - 헤더 기준 Hero 시작 간격: `162px`
  - 타이틀-본문 간격: `56px`
  - 본문-CTA 간격: `56px`

### D. 컴포넌트 구조
- 사용 컴포넌트 목록: `hero-title`, `hero-description`, `btn-primary`
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
- Desktop 레이아웃: 제목 + 로고 마키 row (폭 `1400px`)
- Mobile 레이아웃: 로고 row 좌측 루프 유지
- 정렬 기준: 중앙 정렬
- 최소/최대 높이: 콘텐츠 기준 자동

### D. 컴포넌트 구조
- 사용 컴포넌트 목록: `social-proof-title`, `social-proof-logo-row`, `social-proof-logo-*`, `decor-gradation-left`, `decor-gradation-right`
- 반복 개수: 로고 리스트 2회 반복(무한 루프용)
- 우선 재사용 컴포넌트: `logo-item`

### E. 상태(State)
- default: 로고 좌측 무한 루프 애니메이션
- hover: 미사용
- active: 없음
- disabled: 없음
- loading/empty/error: 로고 데이터 없으면 섹션 숨김

### F. 인터랙션/플로우
- 클릭 시 동작: 기본 없음
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
- 픽셀 검수 기준:
  - 섹션 top margin `138px`
  - 타이틀 색상 `#DCFF95`
  - 로고 표시 높이 `18px`
- 반응형 검수 기준: 모바일에서 로고 잘림 없음
- 접근성 검수 기준: 장식 로고는 빈 alt, 링크 로고는 설명 alt

## [SECTION] LP/MAX/04-features-focus

### A. 목적/메시지
- 이 섹션의 1문장 목적: 데이터 정리 자동화와 재고 리스크 감지 기능을 2개의 대표 카드로 직관적으로 전달한다.
- 사용자에게 기대하는 행동: 핵심 기능을 이해하고 다음 섹션(워크플로우/CTA)으로 자연스럽게 이어진다.

### B. 콘텐츠
- 타이틀: `맥스 AI 재고 관리 에이전트에게 맡기고 / 브랜드 성장에만 집중하세요`
- 본문: `흩어진 데이터를 맥스 AI가 알아서 정리합니다. 필요한 지표와 리스크 알림, 다음 액션까지 한 번에 받아보세요.`
- 보조 문구: 없음
- 버튼/링크 라벨: 없음
- 카드 카피:
  - 카드 1 타이틀: `흩어진 데이터를 모아 회전일수를 만들어요`
  - 카드 1 본문: `엑셀/CSV만 있으면 바로 시작할 수 있어요. 처음부터 복잡한 설정 없이 MAX AI가 브랜드 맞춤지표를 자동으로 딱 만들어줘요.`
  - 카드 2 타이틀: `재고 리스크 자동 감지`
  - 카드 2 본문: `채널별 데이터에서 재고가 쌓이는 구간과 품절 임박 신호를 자동으로 찾아내고, 긴급도 순으로 정리해 대응 액션을 추천합니다.`

### C. 레이아웃
- Desktop 레이아웃: 상단 헤드라인 컬럼 + 하단 2카드 그리드
- Mobile 레이아웃: 세로 스택 (headline -> card-01 -> card-02)
- 정렬 기준: 컨테이너 중앙, 카드 내부 좌상단 정렬
- 최소/최대 높이: 콘텐츠 기준 자동
  - 섹션 top margin: `180px` (social-proof 하단 기준)
  - 타이틀 ↔ 본문 간격: `24px`
  - 본문 ↔ 카드 그리드 간격: `56px`
  - 카드 간격(gap): `24px`
  - 카드 이미지 높이: `544px`
  - 카드 이미지 라운드: `24px`
  - 카드 이미지 ↔ 카드 텍스트 그룹: `40px`
  - 카드 텍스트 그룹 좌우 패딩: `16px`
  - 카드 타이틀 ↔ 설명 간격: `16px`

### D. 컴포넌트 구조
- 사용 컴포넌트 목록: `feature-focus-headline-column`, `feature-focus-card-grid`, `card-feature-focus-01`, `card-feature-focus-02`
- 반복 개수: 카드 2개
- 우선 재사용 컴포넌트: 공통 `feature-card`
- 카드 이미지 에셋:
  - `public/card-image-desktop-01.png`
  - `public/card-image-desktop-02.png`

### E. 상태(State)
- default: 정적 카드
- hover: 없음
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
- 픽셀 검수 기준:
  - 타이틀 폰트 `36px / 50px / -0.5px / 600`
  - 본문 폰트 `16px / 24px / +0.5px / #858585`
  - 카드 타이틀 `24px / 32px / -0.5px / 500`
  - 카드 본문 `16px / 28px / #858585`
  - 카드 이미지 높이 `544px`, 라운드 `24px`
- 반응형 검수 기준: 모바일 스택 전환 시 순서 유지
- 접근성 검수 기준: 장식 요소 `aria-hidden` 처리

## [SECTION] LP/MAX/05-features-workflow

### A. 목적/메시지
- 이 섹션의 1문장 목적: MAX와의 대화 기반 업무 자동화 흐름을 하나의 대표 화면으로 전달한다.
- 사용자에게 기대하는 행동: 워크플로우 기능 가치를 이해하고 하단 CTA까지 자연스럽게 스크롤한다.

### B. 콘텐츠
- 타이틀: `맥스와 대화로 업무 워크플로우를 만들고 / 반복 업무에서 벗어나세요`
- 본문: `업무 흐름을 MAX와 대화로 설계하세요. 목표·데이터·단계만 말하면 워크플로우로 정리됩니다. 한 번 만들면 리포트·점검·알림 같은 반복 업무를 자동 처리하고, 핵심 변화와 다음 액션만 요약해 팀은 실행에 집중할 수 있어요.`
- 보조 문구: 없음
- 버튼/링크 라벨: 없음

### C. 레이아웃
- Desktop 레이아웃: 상단 헤드라인 컬럼 + 하단 1개 카드
- Mobile 레이아웃: 세로 스택 (headline -> card-01)
- 정렬 기준: 컨테이너 중앙 정렬
- 최소/최대 높이: 콘텐츠 기준 자동
  - 섹션 top margin: `180px`
  - 타이틀 ↔ 본문 간격: `24px`
  - 본문 최대 너비: `800px` (center)
  - 본문 ↔ 카드 간격: `48px`
  - 카드 크기: `1024 x 625`
  - 카드 라운드: `32px`

### D. 컴포넌트 구조
- 사용 컴포넌트 목록: `feature-workflow-headline-column`, `feature-workflow-card-grid`, `card-feature-workflow-01`
- 반복 개수: 카드 1개
- 우선 재사용 컴포넌트: 없음
- 카드 이미지 에셋:
  - `public/feature-workflow-card-grid.png`

### E. 상태(State)
- default: 정적 이미지 카드
- hover: 없음
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
- Must: 헤드라인 + 1카드 구성 + 이미지 적용
- Should: 피그마 문구/간격 정밀 매칭
- Could: 카드 내부를 추후 실제 컴포넌트로 분해
- 이번 스프린트 제외 항목: 카드 내부 인터랙션 구현

### I. QA 체크포인트
- 픽셀 검수 기준:
  - 타이틀 폰트 `36px / 50px / -0.5px / 600`
  - 본문 폰트 `16px / 24px / +0.5px / #858585`
  - 본문 max-width `800px`
  - 카드 높이 `625px`, 라운드 `32px`
- 반응형 검수 기준: 모바일 스택 전환 시 제목 → 설명 → 카드 순서 유지
- 접근성 검수 기준: 카드 이미지 alt 텍스트 제공

## [SECTION] LP/MAX/06-heymax

### A. 목적/메시지
- 이 섹션의 1문장 목적: MAX가 어떤 반복 업무를 자동화하는지 플로우 다이어그램과 설명으로 전달한다.
- 사용자에게 기대하는 행동: 기능 범위를 이해하고 하단 CTA 섹션으로 이동한다.

### B. 콘텐츠
- 타이틀: `맥스는 스케일업이 필요한 / 브랜드를 위해 만들어졌습니다.`
- 본문:
  - 제목: `반복 업무, 이제는 MAX AI와 함께 워크플로우로 전환해 더 빠르게 실행하세요.`
  - 설명: `멀티채널 운영에서는 반복 점검과 보고가 곧 비용입니다. MAX가 대화로 업무 기준을 구조화해 워크플로우로 전환하고, 설정된 주기대로 자동 수행해 결과 요약과 실행 항목을 제공합니다.`
  - 소제목: `MAX AI는 이런일을 잘해요`
- 칩: `회전일수 분석`, `품절 임박 알림`, `과재고 정리 플랜`, `프로모션 성과 분석`, `채널별 재고 배분 전략`, `판매 모니터링`, `주간 · 월간 판매 현황 리포트`, `마케팅 전략`
- 버튼/링크 라벨: 없음

### C. 레이아웃
- Desktop 레이아웃: 타이틀 아래 `what-flow-group`(좌) + 설명 컬럼(우) 2열
- Mobile 레이아웃: 세로 스택 (flow-group -> 설명 컬럼)
- 정렬 기준: 두 컬럼 수직 중앙 정렬
- 최소/최대 높이: 콘텐츠 기준 자동
  - 섹션 top margin: `180px`
  - 타이틀 ↔ what-row 간격: `80px`
  - 컬럼 간격: `120px`
  - flow-group 캔버스: `373 x 500`
  - 카드 사이즈: `180 x 72`, radius `10px`
  - 배경 도트 레이어 높이: `900px`

### D. 컴포넌트 구조
- 사용 컴포넌트 목록: `heymax-title`, `feature-workflow-what-row`, `what-flow-group`, `what-description-column`, `chip-workflow-*`
- 반복 개수:
  - flow-card 6개
  - chip 8개
- 우선 재사용 컴포넌트: `chip`
- 배경 장식:
  - 도트 색상 `#464646` (hero와 동일)
  - 섹션 전용 도트 마스크 적용(상하 + 좌우 페이드)

### E. 상태(State)
- default: 정적 카드 + 점선 흐름 애니메이션
- hover: 없음
- active: 없음
- disabled: 없음
- loading/empty/error: 미사용

### F. 인터랙션/플로우
- 클릭 시 동작: 기본 없음
- 외부 이동 URL: 없음
- 새 탭 여부: 없음
- 스크롤 연동 여부: 아니오
- 모션 규칙:
  - 점선 애니메이션: `stroke-dasharray 3 6`
  - duration: `2.8s linear infinite`
  - dash offset: `0 -> -18`
  - 라인별 `animation-delay`를 다르게 적용해 튐 현상 완화
  - 렌더링 보정: `shape-rendering: geometricPrecision`

### G. 계측(Analytics)
- 이벤트명: `section_view`
- 파라미터: `section=heymax`
- 중복 전송 방지 규칙: 세션당 1회

### H. 구현 우선순위
- Must: 타이틀 + flow-group + 설명 컬럼 + 칩
- Should: 점선 분기 형태(중앙에서 분기 후 좌우 하강) 정밀 매칭
- Could: 노드별 강조 애니메이션
- 이번 스프린트 제외 항목: 카드 클릭/툴팁 인터랙션

### I. QA 체크포인트
- 픽셀 검수 기준:
  - 타이틀 폰트 `36px / 50px / -0.5px / 600`
  - what-row top margin `80px`
  - flow 카드 `180x72`, border `#2f2f2f`, background `#111113`
  - 배경 도트가 상하/좌우 가장자리에서 점점 투명해지는지 확인
- 반응형 검수 기준: 모바일에서 flow-group과 텍스트 순서 유지, 오버플로우 없음
- 접근성 검수 기준: 장식 SVG/도트는 `aria-hidden`, 텍스트 대비 유지

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
- 정렬 기준: 섹션 높이 내 수직 중앙 정렬
- 최소/최대 높이:
  - 섹션 높이 `320px`
  - 섹션 상/하 margin `180px`
  - 버튼 크기 `240 x 48`

### D. 컴포넌트 구조
- 사용 컴포넌트 목록: `cta-title`, `pricecontact-cta-btn-primary`
- 반복 개수: 없음
- 우선 재사용 컴포넌트: 없음 (섹션 전용 CTA 스타일)

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
- Could: 버튼 hover 미세 효과
- 이번 스프린트 제외 항목: 다중 문의 채널 분기

### I. QA 체크포인트
- 픽셀 검수 기준:
  - 섹션 높이 `320px`
  - 상/하 margin `180px`
  - CTA 버튼 `240x48`
  - 타이틀 `36px / 50px / -0.5px`
- 반응형 검수 기준: 모바일에서 버튼 full width 여부 확인
- 접근성 검수 기준: 버튼 명확한 접근 가능 이름

## [SECTION] LP/MAX/08-footer

### A. 목적/메시지
- 이 섹션의 1문장 목적: 기본 회사 정보 및 연락처를 제공한다.
- 사용자에게 기대하는 행동: 필요 시 연락처 확인.

### B. 콘텐츠
- 타이틀: 없음
- 본문: `© Splash Corp.`
- 보조 문구: 없음
- 버튼/링크 라벨: 없음

### C. 레이아웃
- Desktop 레이아웃: 단일 저작권 텍스트 중앙 배치
- Mobile 레이아웃: 동일
- 정렬 기준: 중앙 정렬, 작은 텍스트
- 최소/최대 높이: `py-6`
  - 배경색: `#191919`

### D. 컴포넌트 구조
- 사용 컴포넌트 목록: `footer-meta`
- 반복 개수: 없음
- 우선 재사용 컴포넌트: 없음

### E. 상태(State)
- default: 정적
- hover: 없음
- active: 없음
- disabled: 없음
- loading/empty/error: 없음

### F. 인터랙션/플로우
- 클릭 시 동작: 없음
- 외부 이동 URL: 없음
- 새 탭 여부: 해당 없음
- 스크롤 연동 여부: 아니오

### G. 계측(Analytics)
- 이벤트명: 없음
- 파라미터: 없음
- 중복 전송 방지 규칙: 해당 없음

### H. 구현 우선순위
- Must: 회사 텍스트
- Should: 배경/보더 톤 일치
- Could: 법적 링크(개인정보처리방침)
- 이번 스프린트 제외 항목: 다국어 footer

### I. QA 체크포인트
- 픽셀 검수 기준: 상단 border 및 텍스트 컬러톤
- 반응형 검수 기준: 모바일 줄바꿈 시 정보 누락 없음
- 접근성 검수 기준: 링크 대비 및 포커스 표시

## 3) CTA 정책 (Draft)
- 메인 CTA URL: `https://forms.gle/GonphchicsGY6aVB8`
- 섹션별 CTA 위치 키: `header`, `hero`, `bottom_cta`
- 클릭 후 동작: 외부 폼 새 탭 이동
- 추적 이벤트: `cta_click`

## 4) 미정 항목 (TBD)
- 항목: `LP/MAX/07-pricecontact` vs 코드 id `cta` 네이밍 통일
- 의사결정자: Frontend Owner
- 결정 예정일: TBD
- 항목: 모바일 전용 디자인/브레이크포인트 정책 확정 후 별도 구현
- 의사결정자: Design Owner + Frontend Owner
- 결정 예정일: TBD
- 항목: social proof 로고 클릭 가능 여부/링크 정책
- 의사결정자: PO/Marketing
- 결정 예정일: TBD

## 5) 변경 이력 (Draft)
- 2026-02-14: Codex 1차 작성본 추가 (Figma node 기반)
- 2026-02-14: Header/Hero/SocialProof/FeatureFocus 구현값 동기화 (간격, 타이포, 로고 marquee, 배경 도트)
- 2026-02-14: FeatureWorkflow/HeyMax/PriceContact/Footer 구현값 동기화 (1카드 구조, 점선 플로우 애니메이션, 도트 마스크, CTA 240x48, footer 단순화)
