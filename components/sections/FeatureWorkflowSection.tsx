import Image from "next/image";
import Container from "../ui/Container";

export default function FeatureWorkflowSection() {
  return (
    <section className="mt-[180px]" id="features-workflow">
      <Container>
        <h2 className="text-center text-[36px] font-semibold leading-[50px] tracking-[-0.5px] text-white">
          맥스와 대화로 업무 워크플로우를 만들고
          <br />
          반복 업무에서 벗어나세요
        </h2>
        <p className="mx-auto mt-6 max-w-[800px] text-center text-[16px] font-normal leading-6 tracking-[0.5px] text-[#858585]">
          업무 흐름을 MAX와 대화로 설계하세요. 목표·데이터·단계만 말하면 워크플로우로 정리됩니다. 한 번 만들면
          리포트·점검·알림 같은 반복 업무를 자동 처리하고, 핵심 변화와 다음 액션만 요약해 팀은 실행에 집중할 수 있어요.
        </p>

        <div className="mt-12">
          <article>
            <div className="relative h-[625px] w-full overflow-hidden rounded-[32px] bg-[#2f2f2f]">
              <Image
                src="/feature-workflow-card-grid-02.png"
                alt="MAX AI workflow card grid"
                fill
                className="object-cover"
                sizes="1024px"
              />
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
