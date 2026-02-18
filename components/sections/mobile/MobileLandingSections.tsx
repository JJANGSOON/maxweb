import Image from "next/image";
import { GOOGLE_FORM_URL, SOCIAL_LOGOS, TEMP_HIDDEN_SOCIAL_LOGO_NAME_SET } from "@/lib/constants";

const HEYMAX_CHIPS = [
  "회전일수 분석",
  "품절 임박 알림",
  "과재고 정리 플랜",
  "프로모션 성과 분석",
  "채널별 재고 배분 전략",
  "판매 모니터링",
  "주간 · 월간 판매 현황 리포트",
  "마케팅 전략",
] as const;

function MobileContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full px-4 ${className}`}>{children}</div>;
}

function MobileHeader() {
  return (
    <header className="fixed inset-x-0 top-3 z-40">
      <div className="mx-auto w-full px-4">
        <div className="h-14 rounded-full border border-[#2f2f2f] bg-[rgba(17,17,19,0.7)] pl-4 pr-3 py-3 backdrop-blur-[13px]">
          <div className="flex items-center justify-between">
            <a href="#" aria-label="페이지 맨 위로 이동">
              <Image
                src="/header-logo.svg"
                alt="MAX"
                width={62}
                height={12}
                className="h-[calc(var(--spacing)*4)] w-auto"
                priority
              />
            </a>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-[132px] items-center justify-center rounded-full bg-white text-[13px] font-normal leading-none text-[#111113]"
            >
              <span className="inline-flex h-full items-center leading-none">맥스 데모 신청하기</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileHero() {
  return (
    <section id="hero" className="min-h-[324px]">
      <MobileContainer className="px-5 pt-6 text-center">
        <h1 className="break-keep text-[34px] font-semibold leading-[48px] tracking-[-0.6px] text-white min-[390px]:text-[36px]">
          브랜드를 위한 회전일수 기반 인공지능 솔루션
        </h1>
        <p className="mt-10 break-keep text-[16px] leading-[26px] text-[#858585]">
          맥스와 함께 재고 낭비는 줄이고 마진은 개선하고
          <br />
          매출은 MAX!하세요
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-[240px] items-center justify-center gap-2 rounded-full bg-white text-sm font-medium text-[#111113]"
          >
            <span>맥스 데모 신청하기</span>
            <Image src="/cta-icon-arrowright.svg" alt="" width={16} height={16} className="h-4 w-4 shrink-0" aria-hidden />
          </a>
        </div>
      </MobileContainer>
    </section>
  );
}

function MobileSocialProof() {
  const visibleLogos = SOCIAL_LOGOS.filter((logo) => !TEMP_HIDDEN_SOCIAL_LOGO_NAME_SET.has(logo.name));
  const marqueeLogos = [...visibleLogos, ...visibleLogos, ...visibleLogos, ...visibleLogos];

  return (
    <section id="social-proof" className="mt-20">
      <p className="text-center text-sm text-[#DCFF95]">Trusted by industry leaders</p>
      <div className="relative mt-2 h-[50px] overflow-hidden">
        <div className="social-proof-marquee flex h-full w-max items-center gap-8">
          {marqueeLogos.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className="flex h-[18px] items-center">
              <Image src={logo.src} alt={logo.name} width={logo.width} height={logo.height} className="h-[18px] w-auto" />
            </div>
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-10"
          style={{ background: "linear-gradient(90deg, #111113 0%, rgba(17,17,19,0) 100%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-10"
          style={{ background: "linear-gradient(270deg, #111113 0%, rgba(17,17,19,0) 100%)" }}
        />
      </div>
    </section>
  );
}

function MobileFeatureFocus() {
  const mobileFocusCards = [
    {
      imageSrc: "/card-image-desktop-01-02.png",
      imageAlt: "채널 연결을 제안하는 맥스 AI 인터페이스",
      title: "데이터를 모아 회전일수를 만들어요",
      description: "엑셀/CSV만 있어도 시작 가능해요. 필요한 지표는 Max AI가 브랜드에 맞게 만들어줍니다.",
    },
    {
      imageSrc: "/card-image-desktop-02-02.png",
      imageAlt: "재고 리스크를 감지하고 액션을 제안하는 맥스 AI 인터페이스",
      title: "재고 리스크 자동 감지",
      description:
        "Max는 여러 채널의 데이터를 기준으로 재고가 쌓이는 구간과 품절이 임박한 구간을 자동 감지하고, 액션이 필요한 제품을 긴급도 순으로 알려드립니다.",
    },
  ] as const;

  return (
    <section id="features-focus" className="mt-[104px]">
      <MobileContainer className="px-5">
        <h2 className="break-keep text-center text-2xl font-semibold leading-8 tracking-[-0.5px] text-white">
          맥스 AI 재고 에이전트에게 맡기고
          <br />
          성장에만 집중하세요
        </h2>
        <p className="mt-4 break-keep text-center text-sm leading-5 text-[#858585]">
          흩어진 데이터를 맥스 AI가 알아서 정리합니다.
          <br />
          필요한 다음 액션까지 한 번에 받아보세요.
        </p>
        <div className="mt-10 space-y-20">
          {mobileFocusCards.map((card) => (
            <article key={card.title}>
              <div className="relative h-[357px] w-full overflow-hidden rounded-[24px]">
                <Image src={card.imageSrc} alt={card.imageAlt} fill className="object-cover" sizes="100vw" />
              </div>
              <div className="mt-6">
                <h3 className="text-[20px] font-medium leading-8 tracking-[-0.5px] text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-[22px] text-[#858585]">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </MobileContainer>
    </section>
  );
}

function MobileFeatureWorkflow() {
  return (
    <section id="features-workflow" className="mt-[104px]">
      <MobileContainer className="px-5">
        <h2 className="break-keep text-center text-2xl font-semibold leading-8 tracking-[-0.5px] text-white">
          맥스와 대화로 워크플로우를 만들고
          <br />
          반복 업무에서 벗어나세요
        </h2>
        <p className="mt-4 break-keep text-center text-sm leading-5 text-[#858585]">
          업무 흐름을 MAX와 대화로 설계하세요.
          <br />
          목표·데이터·단계만 말하면 워크플로우로 정리됩니다. 팀은 실행에 집중할 수 있어요.
        </p>
        <div className="relative mt-10 h-[357px] overflow-hidden rounded-[32px] bg-[#2f2f2f]">
          <Image
            src="/mobile-feature-workflow-card-grid-02.png"
            alt="모바일 MAX workflow card grid"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </MobileContainer>
    </section>
  );
}

function MobileHeyMax() {
  const flowCards = [
    { title: "판매 급변 감지", type: "Trigger", x: 72, y: 0, dot: "#35e6ea", contentWidth: 94, cardWidth: 176 },
    { title: "재고 수집 → SKU 매칭", type: "Discovery", x: 72, y: 112, dot: "#8a8a8a", contentWidth: 141, cardWidth: 176 },
    { title: "과재고 위험", type: "Branch", x: 0, y: 282, dot: "#8a8a8a", contentWidth: 122.423, cardWidth: 154.423 },
    { title: "품절 임박", type: "Branch", x: 165.576, y: 282, dot: "#8a8a8a", contentWidth: 122.423, cardWidth: 154.423 },
    { title: "할인 전략 제안", type: "Action", x: 0, y: 428, dot: "#ff2a2a", contentWidth: 148, cardWidth: 154.423 },
    { title: "리오더 전략 제안", type: "Action", x: 165.576, y: 428, dot: "#ff2a2a", contentWidth: 122.423, cardWidth: 154.423 },
  ] as const;

  return (
    <section id="heymax" className="relative mt-[104px]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[151px] z-0 h-[741px]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(#464646 1px, transparent 1px), radial-gradient(#464646 1px, transparent 1px)",
            backgroundSize: "40px 40px, 40px 40px",
            backgroundPosition: "0 0, 20px 20px",
            WebkitMaskImage: "radial-gradient(92% 62% at 50% 50%, #000 28%, rgba(0,0,0,0.86) 48%, transparent 80%)",
            maskImage: "radial-gradient(92% 62% at 50% 50%, #000 28%, rgba(0,0,0,0.86) 48%, transparent 80%)",
          }}
        />
      </div>
      <MobileContainer className="relative z-10 px-5">
        <h2 className="break-keep text-center text-2xl font-semibold leading-8 tracking-[-0.5px] text-white">
          맥스는 스케일업이 필요한
          <br />
          브랜드를 위해 만들어졌습니다.
        </h2>

        <div className="mx-auto mt-10 w-[320px]">
          <div className="relative h-[500px] w-[320px]">
            {flowCards.map((card) => (
              <article
                key={card.title}
                className="absolute h-[72px] rounded-[10px] border border-[#2f2f2f] bg-[#111113] px-4"
                style={{ left: `${card.x}px`, top: `${card.y}px`, width: `${card.cardWidth}px` }}
              >
                <div className="flex h-full items-center">
                  <div className="flex items-start gap-2" style={{ width: `${card.contentWidth}px` }}>
                    <span className="mt-2 size-[6px] shrink-0 rounded-full" style={{ backgroundColor: card.dot }} />
                    <div>
                      <p className={`text-sm leading-[22px] text-white ${card.title === "판매 급변 감지" ? "whitespace-nowrap" : ""}`}>
                        {card.title}
                      </p>
                      <p className="text-xs leading-4 text-[#858585]">{card.type}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 320 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path className="heymax-flow-path" d="M160 72V112" />
              <path className="heymax-flow-path" d="M77.212 354V428" />
              <path className="heymax-flow-path" d="M242.788 354V428" />
              <path className="heymax-flow-path" d="M160 184V236Q160 248 172.2 248H242.788Q242.788 248 242.788 260V280" />
              <path className="heymax-flow-path" d="M160 184V236Q160 248 148.65 248H77.212Q77.212 248 77.212 260V280" />

              <circle cx="160" cy="72" r="2" fill="#d3d3d3" />
              <circle cx="160" cy="112" r="2" fill="#d3d3d3" />
              <circle cx="160" cy="184" r="2" fill="#d3d3d3" />
              <circle cx="77.212" cy="280" r="2" fill="#d3d3d3" />
              <circle cx="77.212" cy="354" r="2" fill="#d3d3d3" />
              <circle cx="77.212" cy="428" r="2" fill="#d3d3d3" />
              <circle cx="242.788" cy="280" r="2" fill="#d3d3d3" />
              <circle cx="242.788" cy="354" r="2" fill="#d3d3d3" />
              <circle cx="242.788" cy="428" r="2" fill="#d3d3d3" />
            </svg>
          </div>
        </div>

        <h3 className="mt-10 break-keep text-[20px] font-normal leading-8 tracking-[-0.5px] text-white">
          반복 업무
          <br />
          이제는 MAX AI와 함께 해결하세요
        </h3>
        <p className="mt-2 break-keep text-[16px] leading-[22px] text-[#858585]">
          멀티채널 운영은 반복 점검과 보고가 곧 비용입니다. MAX가 대화로 업무 기준을 구조화해 워크플로우를 만들고, 설정된
          주기대로 자동 수행합니다.
        </p>
        <p className="mt-8 text-[16px] leading-7 text-white">MAX AI는 이런일을 잘해요</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {HEYMAX_CHIPS.map((chip) => (
            <span
              key={chip}
              className="inline-flex h-9 items-center justify-center rounded-[360px] border border-[#2f2f2f] bg-[#202020] px-4 text-sm text-white"
            >
              {chip}
            </span>
          ))}
        </div>
      </MobileContainer>
    </section>
  );
}

function MobileCta() {
  return (
    <section id="cta" className="mt-[90px] h-[352px] bg-[#191919]">
      <MobileContainer className="h-full px-5 pt-[104px]">
        <h2 className="break-keep text-center text-2xl font-normal leading-7 tracking-[-0.5px] text-white">
          <span className="block">맥스 AI에 대해 더 알고 싶으신가요?</span>
          <span className="mt-2 block">연락주십시오.</span>
        </h2>
        <div className="mt-10 flex justify-center">
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-[240px] items-center justify-center gap-2 rounded-[360px] bg-white pl-4 pr-3 text-sm font-normal text-[#111113]"
          >
            <span>문의하기</span>
            <Image src="/cta-icon-arrowright.svg" alt="" width={16} height={16} className="h-4 w-4 shrink-0" aria-hidden />
          </a>
        </div>
      </MobileContainer>
    </section>
  );
}

function MobileFooter() {
  return (
    <footer className="bg-[#191919] py-4">
      <p className="text-center text-xs text-[#6f6f6f]">© Splash Corp.</p>
    </footer>
  );
}

export default function MobileLandingSections() {
  return (
    <>
      <MobileHeader />
      <div className="relative min-h-screen overflow-x-hidden bg-[#111113]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[1080px]"
          style={{
            backgroundImage:
              "radial-gradient(#464646 1px, transparent 1px), radial-gradient(#464646 1px, transparent 1px)",
            backgroundSize: "40px 40px, 40px 40px",
            backgroundPosition: "0 0, 20px 20px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[1080px]"
          style={{ background: "linear-gradient(180deg, rgba(17,17,19,0) 0%, #111113 100%)" }}
        />
        <main className="relative z-10 pt-[120px]">
          <MobileHero />
          <MobileSocialProof />
          <MobileFeatureFocus />
          <MobileFeatureWorkflow />
          <MobileHeyMax />
          <MobileCta />
        </main>
        <div className="relative z-10">
          <MobileFooter />
        </div>
      </div>
    </>
  );
}
