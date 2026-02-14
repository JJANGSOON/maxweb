import Container from "../ui/Container";

const FLOW_CARDS = [
  { title: "판매 급변 감지", type: "Trigger", x: 97, y: 0, dot: "#35e6ea" },
  { title: "재고 수집 → SKU 매칭", type: "Discovery", x: 97, y: 112, dot: "#8a8a8a" },
  { title: "과재고 위험", type: "Branch", x: 0, y: 282, dot: "#8a8a8a" },
  { title: "품절 임박", type: "Branch", x: 193, y: 282, dot: "#8a8a8a" },
  { title: "할인 전략 제안", type: "Action", x: 0, y: 428, dot: "#ff2a2a" },
  { title: "리오더 전략 제안", type: "Action", x: 193, y: 428, dot: "#ff2a2a" },
] as const;

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

export default function HeyMaxSection() {
  return (
    <section className="relative mt-[180px]" id="heymax">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[900px]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(#464646 1px, transparent 1px), radial-gradient(#464646 1px, transparent 1px)",
            backgroundSize: "40px 40px, 40px 40px",
            backgroundPosition: "0 0, 20px 20px",
            WebkitMaskImage: "radial-gradient(92% 58% at 50% 50%, #000 22%, rgba(0,0,0,0.86) 42%, transparent 76%)",
            maskImage: "radial-gradient(92% 58% at 50% 50%, #000 22%, rgba(0,0,0,0.86) 42%, transparent 76%)",
          }}
        />
      </div>

      <Container className="relative z-10">
        <h2 className="text-center text-[36px] font-semibold leading-[50px] tracking-[-0.5px] text-white">
          맥스는 스케일업이 필요한
          <br />
          브랜드를 위해 만들어졌습니다.
        </h2>

        <div className="mt-[80px] flex flex-col items-center justify-center gap-10 px-6 md:flex-row md:gap-[120px]">
          <div className="relative h-[500px] w-[373px] shrink-0">
            {FLOW_CARDS.map((card) => (
              <article
                key={card.title}
                className="absolute h-[72px] w-[180px] rounded-[10px] border border-[#2f2f2f] bg-[#111113] px-4 py-[10px]"
                style={{ left: `${card.x}px`, top: `${card.y}px` }}
              >
                <div className="flex h-full items-center">
                  <div className="flex items-start gap-2">
                    <span className="mt-[8px] size-[6px] shrink-0 rounded-full" style={{ backgroundColor: card.dot }} />
                    <div className="flex flex-col gap-1">
                      <p className="text-[14px] leading-[22px] text-white">{card.title}</p>
                      <p className="text-[12px] leading-4 text-[#858585]">{card.type}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0"
              viewBox="0 0 373 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path className="heymax-flow-path" d="M187 72V112" style={{ animationDelay: "-0.1s" }} />
              <path className="heymax-flow-path" d="M90 354V428" style={{ animationDelay: "-0.45s" }} />
              <path className="heymax-flow-path" d="M283 354V428" style={{ animationDelay: "-0.8s" }} />
              <path
                className="heymax-flow-path"
                d="M187 184V236Q187 248 175 248H102Q90 248 90 260V280"
                style={{ animationDelay: "-0.2s" }}
              />
              <path
                className="heymax-flow-path"
                d="M187 184V236Q187 248 199 248H271Q283 248 283 260V280"
                style={{ animationDelay: "-0.6s" }}
              />

              <circle cx="187" cy="72" r="2" fill="#d3d3d3" />
              <circle cx="187" cy="112" r="2" fill="#d3d3d3" />
              <circle cx="187" cy="184" r="2" fill="#d3d3d3" />
              <circle cx="90" cy="280" r="2" fill="#d3d3d3" />
              <circle cx="90" cy="354" r="2" fill="#d3d3d3" />
              <circle cx="90" cy="428" r="2" fill="#d3d3d3" />
              <circle cx="283" cy="280" r="2" fill="#d3d3d3" />
              <circle cx="283" cy="354" r="2" fill="#d3d3d3" />
              <circle cx="283" cy="428" r="2" fill="#d3d3d3" />
            </svg>
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-start gap-8">
            <h3 className="text-[24px] font-normal leading-9 tracking-[-0.5px] text-white">
              반복 업무, 이제는 MAX AI와 함께 워크플로우로 전환해 더 빠르게 실행하세요.
            </h3>
            <p className="text-[16px] leading-7 text-[#858585]">
              멀티채널 운영에서는 반복 점검과 보고가 곧 비용입니다. MAX가 대화로 업무 기준을 구조화해 워크플로우로
              전환하고, 설정된 주기대로 자동 수행해 결과 요약과 실행 항목을 제공합니다.
            </p>
            <p className="text-[16px] leading-7 text-white">MAX AI는 이런일을 잘해요</p>

            <div className="flex flex-wrap gap-2">
              {HEYMAX_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="flex h-9 items-center justify-center rounded-[360px] border border-[#2f2f2f] bg-[#202020] px-4 text-[14px] leading-[22px] text-white"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
