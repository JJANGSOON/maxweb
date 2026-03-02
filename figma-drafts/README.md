# Figma Draft Workspace

`generate_figma_design` 작업 전용 구조입니다. 앱 라우트와 분리해서 시안 반복 속도를 높입니다.

## Recommended Hierarchy

```text
figma-drafts/
  design/
    guides/
      DESIGN_GUIDE_TEMPLATE.md
      <screen-name>-guide.md
    html/
      SCREEN_TEMPLATE.html
      <screen-name>-v1.html
  components/
    guides/
      COMPONENT_GUIDE_TEMPLATE.md
    specs/
      left-nav.md
      <component-name>.md
    html/
      left-nav-v1.html
      <component-name>-v1.html
  archive/
```

## Workflow
1. 컴포넌트 고정 규칙 정의: `components/specs/*.md`
2. 화면 가이드 작성: `design/guides/<screen-name>-guide.md`
3. 화면 HTML 제작: `design/html/<screen-name>-v1.html`
4. 로컬 확인 후 Codex에게 `generate_figma_design` 요청

## Quick Start

```bash
cp figma-drafts/design/guides/DESIGN_GUIDE_TEMPLATE.md figma-drafts/design/guides/dashboard-guide.md
cp figma-drafts/design/html/SCREEN_TEMPLATE.html figma-drafts/design/html/dashboard-v1.html
cp figma-drafts/components/guides/COMPONENT_GUIDE_TEMPLATE.md figma-drafts/components/specs/table-filter.md
cp figma-drafts/components/html/left-nav-v1.html figma-drafts/components/html/top-bar-v1.html
```

로컬 서버 실행:

```bash
./scripts/serve-figma-drafts.sh
```

기본 주소: `http://localhost:3310`
