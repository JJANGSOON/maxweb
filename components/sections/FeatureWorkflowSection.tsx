import Container from "../ui/Container";
import { WORKFLOW_CHIPS } from "@/lib/constants";

const FLOW_STEPS = [
  ["판매 급변 감지", "Trigger"],
  ["재고 수집 → SKU 매칭", "Discovery"],
  ["과재고 위험", "Branch"],
  ["품절 임박", "Branch"],
  ["할인 전략 제안", "Action"],
  ["리오더 전략 제안", "Action"],
] as const;

export default function FeatureWorkflowSection() {
  return (
    <section className="mt-28" id="features-workflow">
      <Container className="grid items-start gap-10 md:grid-cols-[420px_1fr]">
        <div className="grid gap-4">
          {FLOW_STEPS.map(([title, type]) => (
            <div key={title} className="rounded-xl border border-[#2f2f2f] bg-[#111113] px-4 py-3">
              <p className="text-sm text-white">{title}</p>
              <p className="mt-1 text-xs text-[#7f7f7f]">{type}</p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-3xl leading-tight tracking-[-0.02em] text-white md:text-5xl">
            반복 업무, 이제는 MAX AI와 함께
            <br />
            워크플로우로 전환하세요.
          </h2>
          <p className="mt-6 text-base leading-8 text-[#838383]">
            멀티채널 운영에서는 반복 점검과 보고가 비용입니다. MAX가 대화로 업무 기준을 구조화하고, 자동 수행 후 결과와
            액션을 요약해 전달합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {WORKFLOW_CHIPS.map((chip) => (
              <span key={chip} className="rounded-full border border-[#2f2f2f] bg-[#202020] px-4 py-2 text-sm text-white">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
