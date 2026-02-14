import Container from "../ui/Container";
import PrimaryButton from "../ui/PrimaryButton";
import { GOOGLE_FORM_URL } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="pt-36 md:pt-[266px]" id="hero">
      <Container className="text-center">
        <h1 className="mx-auto max-w-[920px] break-keep text-4xl leading-tight tracking-[-0.03em] text-white md:text-6xl">
          성장하는 브랜드를 위한 회전일수 기반
          <br />
          인공지능 재고 운영 솔루션
        </h1>
        <p className="mx-auto mt-14 max-w-3xl text-base leading-7 text-[#858585] md:text-lg">
          맥스와 함께 재고 낭비는 줄이고 마진은 개선하고
          <br />
          매출은 최대화하세요
        </p>
        <PrimaryButton href={GOOGLE_FORM_URL} label="맥스 데모 신청하기" className="mt-14" />
      </Container>
    </section>
  );
}
