import Container from "../ui/Container";
import { FOCUS_FEATURE_CARDS } from "@/lib/constants";

export default function FeatureFocusSection() {
  return (
    <section className="mt-28" id="features-focus">
      <Container>
        <h2 className="text-center text-3xl leading-tight tracking-[-0.02em] text-white md:text-5xl">
          맥스 AI로 관리해야할 핵심데이터를 빠르게 파악하고
          <br />
          브랜드 성장에만 집중하세요.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {FOCUS_FEATURE_CARDS.map((card, idx) => (
            <article key={card.title} className="overflow-hidden rounded-2xl border border-[#2f2f2f] bg-[#101114]">
              <div className="h-64 bg-[radial-gradient(110%_95%_at_50%_0%,#ffd5b3_0%,#7f8fc9_45%,#0f1116_100%)]" />
              <div className="p-6">
                <h3 className="text-lg text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#898989]">{card.description}</p>
                <p className="mt-4 text-xs text-[#666]">Card {idx + 1}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
