# Left Navigation Spec

## 0) 기본 정보
- 컴포넌트 이름: Left Navigation
- 버전: v1 (baseline)
- 적용 범위: 제품 웹 앱 전체 (`/app/*`)
- 소유: Product Design + Frontend

## 1) 목적/역할
- 제품의 1차 탐색 구조를 고정해 페이지 전환 비용을 줄인다.
- 사용자가 현재 위치(Active)와 이동 가능 영역을 즉시 인지하게 한다.

## 2) IA (정보 구조)
- Primary 메뉴(순서 고정):
1. Dashboard (`/app`)
2. Inventory (`/app/inventory`)
3. Forecast (`/app/forecast`)
4. Orders (`/app/orders`)
5. Alerts (`/app/alerts`)
6. Reports (`/app/reports`)
- Secondary 액션(하단):
1. Settings (`/app/settings`)
2. Help (`/app/help`)
3. Logout (action)

## 3) 고정 규칙 (Always)
1. Desktop/Tablet에서 좌측 고정 레일 유지
2. 상단 브랜드 영역 + 중간 Primary 메뉴 + 하단 Secondary 영역 구조 유지
3. Active는 배경/인디케이터/텍스트 굵기 3요소 중 최소 2개 이상으로 표현
4. 페이지별 커스텀 링크 추가 금지 (IA 변경은 스펙 버전업으로만)

## 4) 레이아웃/치수
- Desktop (>=1200): 폭 256px, 내부 패딩 16px, 전체 높이 100vh
- Tablet (768~1199): 폭 220px, 라벨 축약 허용
- Mobile (<768): 기본 숨김, 오버레이 드로어(폭 84vw, max 320px)
- 메뉴 아이템 높이: 40px
- 메뉴 간 간격: 6px

## 5) 상태 (States)
- Default: text `#8F98AD`, bg transparent
- Hover: text `#E6ECFF`, bg `#1A2133`
- Active: text `#FFFFFF`, bg `#24304A`, left indicator 3px `#5B8CFF`
- Focus-visible: `2px` outline `#8FB2FF`, offset `2px`
- Disabled(필요 시): opacity 0.45, pointer-events none

## 6) 반응형 동작
- Desktop/Tablet: 고정 노출
- Mobile: 상단 햄버거 클릭 시 드로어 오픈
- Mobile 오픈 시 배경 스크림(`rgba(0,0,0,0.45)`) + body scroll lock
- ESC/스크림 클릭 시 닫힘

## 7) 접근성 (A11y)
- 내비 래퍼: `<nav aria-label="Primary">`
- 현재 메뉴: `aria-current="page"`
- 키보드 순서: logo -> primary items -> secondary items
- 대비 기준: 본문/아이콘 4.5:1 이상

## 8) 금지사항 (Must Not)
1. 화면마다 Left Nav 색/폭/위치를 다르게 쓰지 않는다
2. Active를 색상만으로 표현하지 않는다
3. Mobile에서 항상 펼친 상태로 두지 않는다
4. 메뉴 순서를 임의로 바꾸지 않는다

## 9) 화면 가이드 연동 규칙
- 화면 Design Guide는 Left Nav를 공통 고정 컴포넌트로 참조한다.
- 화면별로 변경 가능한 값은 아래만 허용한다:
1. active 메뉴
2. 배지 숫자(예: Alerts 3)
3. Secondary 영역 노출 여부

## 10) 변경 관리
- IA/레이아웃 변경 시 `v2`로 명시하고 변경 이력 기록
- 화면 단위 예외가 필요하면 컴포넌트가 아닌 화면 요구사항 문서에 이유를 남긴다
