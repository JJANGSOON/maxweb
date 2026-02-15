import Image from "next/image";
import { FOCUS_FEATURE_CARDS, GOOGLE_FORM_URL, SOCIAL_LOGOS } from "@/lib/constants";

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
              className="inline-flex h-8 w-[132px] items-center justify-center rounded-full bg-white text-[14px] font-normal leading-[22px] text-[#111113]"
            >
              <span className="block leading-[22px]">맥스 데모 신청하기</span>
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
        <h1 className="break-keep text-[36px] font-semibold leading-[48px] tracking-[-0.6px] text-white">
          브랜드를 위한 회전일수 기반
          <br />
          인공지능솔루션
        </h1>
        <p className="mt-10 break-keep text-[18px] leading-[26px] text-[#858585]">
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
            <span aria-hidden>→</span>
          </a>
        </div>
      </MobileContainer>
    </section>
  );
}

function MobileSocialProof() {
  const marqueeLogos = [...SOCIAL_LOGOS, ...SOCIAL_LOGOS];

  return (
    <section id="social-proof" className="mt-20">
      <p className="text-center text-sm text-[#DCFF95]">Trusted by industry leaders</p>
      <div className="relative mt-4 h-[50px] overflow-hidden">
        <div className="social-proof-marquee flex h-full w-max items-center gap-8 pr-8">
          {marqueeLogos.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className="flex h-[18px] items-center">
              <Image src={logo.src} alt={logo.name} width={logo.width} height={logo.height} className="h-[18px] w-auto" />
            </div>
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[65px]"
          style={{ background: "linear-gradient(90deg, #111113 0%, rgba(17,17,19,0) 100%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-[65px]"
          style={{ background: "linear-gradient(270deg, #111113 0%, rgba(17,17,19,0) 100%)" }}
        />
      </div>
    </section>
  );
}

function MobileFeatureFocus() {
  return (
    <section id="features-focus" className="mt-[104px]">
      <MobileContainer>
        <h2 className="break-keep text-[30px] font-semibold leading-8 tracking-[-0.5px] text-white">
          맥스 AI 재고 에이전트에게 맡기고
          <br />
          성장에만 집중하세요
        </h2>
        <p className="mt-4 break-keep text-[16px] leading-5 text-[#858585]">
          흩어진 데이터를 맥스 AI가 알아서 정리합니다.
          <br />
          필요한 다음 액션까지 한 번에 받아보세요.
        </p>
        <div className="mt-10 space-y-20">
          {FOCUS_FEATURE_CARDS.map((card) => (
            <article key={card.title}>
              <div className="relative h-[357px] w-full overflow-hidden rounded-[24px]">
                <Image src={card.imageSrc} alt={card.imageAlt} fill className="object-cover" sizes="100vw" />
              </div>
              <div className="mt-6">
                <h3 className="text-2xl font-medium leading-8 tracking-[-0.5px] text-white">
                  {card.title === "흩어진 데이터를 모아 회전일수를 만들어요"
                    ? "데이터를 모아 회전일수를 만들어요"
                    : card.title}
                </h3>
                <p className="mt-2 text-[16px] leading-[22px] text-[#858585]">
                  {card.title === "흩어진 데이터를 모아 회전일수를 만들어요"
                    ? "엑셀/CSV만 있어도 시작 가능해요. 필요한 지표는 Max AI가 브랜드에 맞게 만들어줍니다."
                    : card.description}
                </p>
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
      <MobileContainer>
        <h2 className="break-keep text-[30px] font-semibold leading-8 tracking-[-0.5px] text-white">
          맥스와 대화로 워크플로우를 만들고
          <br />
          반복 업무에서 벗어나세요
        </h2>
        <p className="mt-4 break-keep text-[16px] leading-5 text-[#858585]">
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
  return (
    <section id="heymax" className="relative mt-[180px]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[780px]">
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
      <MobileContainer className="relative z-10">
        <h2 className="break-keep text-center text-[30px] font-semibold leading-8 tracking-[-0.5px] text-white">
          맥스 AI가 반복 업무를 자동화해
          <br />
          팀은 실행에 집중합니다.
        </h2>

        <div className="mt-12 rounded-xl border border-[#2f2f2f] bg-[#0f1014] p-4">
          <svg viewBox="0 0 296 200" className="h-auto w-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect x="88" y="0.5" width="120" height="36" rx="10" stroke="#2f2f2f" />
            <rect x="0.5" y="76.5" width="132" height="36" rx="10" stroke="#2f2f2f" />
            <rect x="163.5" y="76.5" width="132" height="36" rx="10" stroke="#2f2f2f" />
            <rect x="0.5" y="163.5" width="132" height="36" rx="10" stroke="#2f2f2f" />
            <rect x="163.5" y="163.5" width="132" height="36" rx="10" stroke="#2f2f2f" />

            <circle cx="100" cy="18" r="3" fill="#35e6ea" />
            <circle cx="12" cy="94" r="3" fill="#8a8a8a" />
            <circle cx="175" cy="94" r="3" fill="#8a8a8a" />
            <circle cx="12" cy="181" r="3" fill="#ff2a2a" />
            <circle cx="175" cy="181" r="3" fill="#ff2a2a" />

            <path className="heymax-flow-path" d="M148 36V56" />
            <path className="heymax-flow-path" d="M148 56V66Q148 76 138 76H66Q56 76 56 86" />
            <path className="heymax-flow-path" d="M148 56V66Q148 76 158 76H230Q240 76 240 86" />
            <path className="heymax-flow-path" d="M56 112V163" />
            <path className="heymax-flow-path" d="M240 112V163" />

            <text x="110" y="23" fill="white" fontSize="11">판매 급변 감지</text>
            <text x="22" y="99" fill="white" fontSize="11">과재고 위험</text>
            <text x="185" y="99" fill="white" fontSize="11">품절 임박</text>
            <text x="22" y="186" fill="white" fontSize="11">할인 전략 제안</text>
            <text x="185" y="186" fill="white" fontSize="11">리오더 전략 제안</text>
          </svg>
        </div>

        <p className="mt-6 break-keep text-[16px] leading-7 text-[#858585]">
          멀티채널 운영의 점검·보고·알림을 MAX가 대신 수행하고 변화 요약과 다음 액션을 전달합니다.
        </p>
        <p className="mt-6 text-[16px] leading-7 text-white">MAX AI는 이런 일을 잘해요</p>

        <div className="mt-3 flex flex-wrap gap-2">
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
    <section id="cta" className="my-[160px]">
      <MobileContainer>
        <h2 className="break-keep text-center text-[28px] leading-9 tracking-[-0.5px] text-white">
          맥스 AI에 대해 더 알고 싶으신가요?
        </h2>
        <div className="mt-6 flex justify-center">
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-[240px] items-center justify-center rounded-full bg-white text-sm font-medium text-[#111113]"
          >
            문의하기
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
