import Image from "next/image";
import { GOOGLE_FORM_URL } from "@/lib/constants";

export default function BlogDemoCta() {
  return (
    <section className="pb-16 md:pb-20">
      <div className="flex w-full flex-col items-center justify-center gap-8 rounded-[22px] border border-[#2f2f2f] bg-[#202020] px-5 py-8 text-center md:gap-10 md:px-6 md:py-10">
        <div className="flex max-w-[326px] flex-col items-center gap-2 text-white">
          <p className="text-[46px] leading-[52px] tracking-[-0.5px] md:text-[57px] md:leading-[64px]">☕️</p>
          <h2 className="text-[20px] leading-7 font-semibold tracking-[-0.5px]">
            맥스가 궁금하신가요?
          </h2>
          <p className="text-sm leading-[22px] text-[#E6E6E6]">
            아티클을 읽고 맥스 제품에 대해 더 자세히 알고 싶으신가요? 지금 맥스를 무료로 사용해보세요!
          </p>
        </div>

        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 w-full max-w-[240px] items-center justify-center gap-2 rounded-full bg-white pl-4 pr-3 text-sm leading-[22px] text-[#111113] transition hover:bg-[#ececec]"
        >
          <span>맥스 데모 신청하기</span>
          <Image src="/cta-icon-arrowright.svg" alt="" width={16} height={16} className="h-4 w-4 shrink-0" aria-hidden />
        </a>
      </div>
    </section>
  );
}
