# Figma Naming Guide (MAX Web)

## 0) 목적
- 이 문서는 MAX 웹 프로젝트의 Figma 레이어/프레임 네이밍을 표준화하기 위한 가이드다.
- 목표는 3가지다:
  - 디자인 해석 속도 향상
  - 디자인 → 코드 매핑 정확도 향상
  - 유지보수/핸드오프 비용 절감

---

## 1) 핵심 원칙
- 이름은 "모양"이 아니라 "역할"로 짓는다.
  - 나쁨: `Frame 12`, `Rectangle 4`, `Group 3`
  - 좋음: `hero-title`, `cta-primary`, `feature-card`
- 한글/영문 혼용보다 영문 소문자 + kebab-case를 기본으로 한다.
- 숫자 접두는 "순서가 중요한 최상위 섹션"에서만 사용한다.
- 같은 역할은 항상 같은 이름을 쓴다.
  - 예: 모든 주요 버튼은 `cta-primary`
- 장식 요소는 `decor-*`로 명시해 구현 우선순위를 분리한다.

---

## 2) 권장 네이밍 포맷

### 2.1 최상위 페이지/섹션
- 포맷: `LP/MAX/{번호}-{섹션명}`
- 예시:
  - `LP/MAX/01-hero`
  - `LP/MAX/02-social-proof`
  - `LP/MAX/03-problem`
  - `LP/MAX/04-solution`
  - `LP/MAX/05-how-it-works`
  - `LP/MAX/06-features`
  - `LP/MAX/07-faq`
  - `LP/MAX/08-cta`
  - `LP/MAX/09-footer`

### 2.2 섹션 내부 블록
- 포맷: `{section}-{block}`
- 예시:
  - `hero-headline-wrap`
  - `hero-cta-group`
  - `social-proof-logo-row`
  - `features-card-grid`
  - `footer-contact-row`

### 2.3 컴포넌트/재사용 요소
- 포맷: `{component}-{variant}`
- 예시:
  - `btn-primary`
  - `btn-secondary`
  - `card-feature`
  - `chip-keyword`
  - `nav-item`

### 2.4 텍스트 레이어
- 포맷: `{section}-{type}`
- 예시:
  - `hero-title`
  - `hero-subtitle`
  - `problem-description`
  - `cta-label`

### 2.5 이미지/아이콘/장식
- 포맷:
  - 이미지: `{section}-image-{id}`
  - 아이콘: `{section}-icon-{name}`
  - 장식: `decor-{shape}-{id}`
- 예시:
  - `hero-image-main`
  - `cta-icon-arrow`
  - `decor-dot-grid-01`

---

## 3) 상태(State) 네이밍 규칙
- 인터랙션 상태는 suffix로 통일한다.
- 포맷: `{name}--{state}`
- 상태 집합:
  - `--default`
  - `--hover`
  - `--active`
  - `--disabled`
  - `--focus`
- 예시:
  - `btn-primary--default`
  - `btn-primary--hover`

---

## 4) 오토레이아웃/컨테이너 규칙
- 컨테이너는 `container-*` 접두를 쓴다.
  - 예: `container-page`, `container-section`, `container-content`
- 행/열 그룹은 역할 중심으로 명시한다.
  - 예: `feature-card-row`, `faq-item-list`
- 단순 묶음(`Group`)은 가능한 제거하고 의미 있는 이름으로 승격한다.

---

## 5) 금지 규칙
- 아래 이름은 금지:
  - `Frame 1`, `Frame 59`, `Group 3`, `Rectangle 2`, `Text 14`
- 아래 패턴도 금지:
  - 의미 없는 약어 (`tmp`, `box`, `asdf`)
  - 같은 섹션에서 중복 이름 (`title`, `title`, `title`)

---

## 6) 빠른 리네이밍 우선순위
- 시간이 부족하면 아래 순서대로 정리한다.
1. 최상위 섹션 프레임
2. CTA 관련 요소(버튼/텍스트)
3. 반복 컴포넌트(카드/칩/네비 아이템)
4. 장식 요소(`decor-*`)

---

## 7) 디자인 → 코드 매핑 규칙
- 섹션 이름은 코드 컴포넌트명과 1:1 대응한다.
  - `01-hero` → `HeroSection`
  - `08-cta` → `CtaSection`
- 반복 컴포넌트 이름은 코드 재사용 단위와 맞춘다.
  - `card-feature` → `FeatureCard`
  - `chip-keyword` → `KeywordChip`
- 분석 이벤트 파라미터와 이름을 맞춘다.
  - `cta-primary` + 위치값(`hero`, `footer`) 조합 권장

---

## 8) 운영 체크리스트 (PR 전)
- 모든 최상위 섹션이 `LP/MAX/{번호}-{섹션명}` 형식인가?
- `Frame/Group/Rectangle/Text + 숫자` 이름이 남아있지 않은가?
- CTA와 반복 컴포넌트 이름이 일관적인가?
- state suffix(`--default` 등)가 통일되어 있는가?
- 장식 요소가 `decor-*`로 분리되어 있는가?

---

## 9) 현재 파일에 바로 적용할 권장 시작점
- 현재 원페이지 기준 최소 변경:
  - 루트 `MaxWeb` 유지 가능
  - 헤더 `Frame 7` → `header-nav`
  - CTA 섹션 `Frame 104`(x=4129) → `cta-section`
  - 푸터 `Frame 104`(x=4569) → `footer-section`
  - 점 배경 계열 `Backgorund_Dot` → `decor-dot-background`

---

## 10) 결론
- 지금처럼 `docs/guide` 안에 가이드를 별도 문서로 관리하는 방식이 맞다.
- 이 문서를 기준으로 네이밍만 정리해도 구현 품질과 작업 속도가 체감될 수준으로 개선된다.

---

## 11) 리네이밍 수정 우선순위 체크리스트 (실전용)
- 아래 순서대로 정리하면 작업량 대비 품질 개선 폭이 가장 크다.

### 11.1 P0 (지금 바로)
- 루트/섹션 프레임이 `LP/MAX/{번호}-{섹션명}` 형식인지 확인
- `Frame N`, `Group N`, `Rectangle N`, `Text N` 제거
- CTA 관련 이름 통일:
  - `btn-primary`
  - `cta-label`
  - `cta-icon-arrow-right`

### 11.2 P1 (다음)
- 반복 카드/칩 이름 통일:
  - `card-feature-focus-01`, `card-feature-focus-02`
  - `card-feature-workflow-01`
  - `chip-workflow-*`
- 텍스트 레이어 일반화:
  - `card-title`, `card-description`
  - `feature-*-title`, `feature-*-description`

### 11.3 P2 (마무리)
- 장식 요소 명시:
  - `decor-dot-*`
  - `decor-gradation-left`, `decor-gradation-right`
- 좌우/순번 표기 정규화:
  - `-left/-right`
  - `-01/-02` (0 패딩 통일)

### 11.4 최종 검수 질문
- 같은 역할의 레이어가 서로 다른 이름을 쓰고 있지 않은가?
- 이름만 보고도 위치/역할/상태를 유추할 수 있는가?
- 개발자가 코드 컴포넌트명으로 바로 변환 가능한가?
