import Container from "../ui/Container";
import { GOOGLE_FORM_URL } from "@/lib/constants";

export default function CtaSection() {
  return (
    <section className="my-[200px] h-[320px]" id="cta">
      <Container className="h-full">
        <div className="flex h-full flex-col items-start justify-center gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[36px] font-normal leading-[50px] tracking-[-0.5px] text-white">
            맥스 AI에 대해 더 알고 싶으신가요?
            <br />
            연락주십시오.
          </h2>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-[240px] items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-[#111113] transition hover:bg-[#ececec]"
          >
            문의하기
          </a>
        </div>
      </Container>
    </section>
  );
}
