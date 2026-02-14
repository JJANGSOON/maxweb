import Container from "../ui/Container";
import PrimaryButton from "../ui/PrimaryButton";
import { GOOGLE_FORM_URL } from "@/lib/constants";

export default function CtaSection() {
  return (
    <section className="mt-28" id="cta">
      <Container className="rounded-3xl border border-[#2a2a2a] bg-[#090b12] p-8 md:p-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 className="text-3xl leading-tight tracking-[-0.02em] text-white md:text-5xl">
            맥스 AI에 대해 더 알고 싶으신가요?
            <br />
            연락주십시오.
          </h2>
          <PrimaryButton href={GOOGLE_FORM_URL} label="문의하기" />
        </div>
      </Container>
    </section>
  );
}
