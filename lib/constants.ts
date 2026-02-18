export const GOOGLE_FORM_URL = "https://forms.gle/GonphchicsGY6aVB8";

export const NAV_ITEMS = [
  { label: "Hey Max!", href: "#heymax", target: "heymax" },
  { label: "맥스의 기능", href: "#features-focus", target: "features" },
  { label: "맥스의 가격", href: "#cta", target: "cta" },
  { label: "블로그", href: "/blog", target: "blog" },
];

export const SOCIAL_LOGOS = [
  { name: "Musinsa", src: "/social-proof-logo-musinsa.svg", width: 118, height: 20 },
  { name: "29CM", src: "/social-proof-logo-29cm.svg", width: 80, height: 20 },
  { name: "Cafe24", src: "/social-proof-logo-cafe24.svg", width: 111, height: 20 },
  { name: "EQL", src: "/social-proof-logo-eql.svg", width: 58, height: 20 },
  { name: "Mazi", src: "/social-proof-logo-mazi.svg", width: 197, height: 20 },
  { name: "Raran", src: "/social-proof-logo-raran.svg", width: 102, height: 20 },
  { name: "Bruman", src: "/social-proof-logo-bruman.svg", width: 101, height: 20 },
  { name: "SEW", src: "/social-proof-logo-sew.svg", width: 64, height: 20 },
  { name: "Plainpod", src: "/social-proof-logo-plainpod.svg", width: 101, height: 24 },
  { name: "LFM", src: "/social-proof-logo-lfm.svg", width: 178, height: 20 },
] as const;

// Temporary hide list for unreleased partnership logos.
export const TEMP_HIDDEN_SOCIAL_LOGO_NAMES = ["Musinsa", "29CM", "Cafe24", "EQL"] as const;

export const FOCUS_FEATURE_CARDS = [
  {
    imageSrc: "/card-image-desktop-01-02.png",
    imageAlt: "채널 연결을 제안하는 맥스 AI 인터페이스",
    title: "흩어진 데이터를 모아 회전일수를 만들어요",
    description:
      "엑셀/CSV만 있으면 바로 시작할 수 있어요. 처음부터 복잡한 설정 없이 MAX AI가 브랜드 맞춤지표를 자동으로 딱 만들어줘요.",
  },
  {
    imageSrc: "/card-image-desktop-02-02.png",
    imageAlt: "재고 리스크를 감지하고 액션을 제안하는 맥스 AI 인터페이스",
    title: "재고 리스크 자동 감지",
    description:
      "채널별 데이터에서 재고가 쌓이는 구간과 품절 임박 신호를 자동으로 찾아내고, 긴급도 순으로 정리해 대응 액션을 추천합니다.",
  },
];
