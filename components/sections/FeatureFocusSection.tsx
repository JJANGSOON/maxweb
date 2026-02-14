import Image from "next/image";
import Container from "../ui/Container";
import { FOCUS_FEATURE_CARDS } from "@/lib/constants";

export default function FeatureFocusSection() {
  return (
    <section className="mt-[180px]" id="features-focus">
      <Container>
        <h2 className="text-center text-[36px] font-semibold leading-[50px] tracking-[-0.5px] text-white">
          맥스 AI 재고 관리 에이전트에게 맡기고
          <br />
          브랜드 성장에만 집중하세요
        </h2>
        <p className="mt-6 text-center text-[16px] font-normal leading-6 tracking-[0.5px] text-[#858585]">
          흩어진 데이터를 맥스 AI가 알아서 정리합니다. 필요한 지표와 리스크 알림, 다음 액션까지 한 번에 받아보세요.
        </p>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {FOCUS_FEATURE_CARDS.map((card) => (
            <article key={card.title}>
              <div className="relative h-[544px] w-full overflow-hidden rounded-[24px]">
                <Image src={card.imageSrc} alt={card.imageAlt} fill className="object-cover" sizes="(min-width: 768px) 500px, 100vw" />
              </div>
              <div className="mt-10 px-4">
                <h3 className="text-[24px] font-medium leading-8 tracking-[-0.5px] text-white">{card.title}</h3>
                <p className="mt-4 text-[16px] font-normal leading-7 text-[#858585]">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
