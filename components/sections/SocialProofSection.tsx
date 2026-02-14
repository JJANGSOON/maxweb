import Image from "next/image";
import Container from "../ui/Container";
import { SOCIAL_LOGOS } from "@/lib/constants";

export default function SocialProofSection() {
  const marqueeLogos = [...SOCIAL_LOGOS, ...SOCIAL_LOGOS];

  return (
    <section className="mt-[138px]" id="social-proof">
      <Container className="max-w-[1400px]">
        <p className="text-center text-sm text-[#DCFF95]">Trusted by industry leaders</p>
        <div className="relative mt-6 h-[50px] overflow-hidden">
          <div className="social-proof-marquee flex h-full w-max items-center gap-10 pr-10">
            {marqueeLogos.map((logo, index) => (
              <div key={`${logo.name}-${index}`} className="flex h-[18px] items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="h-[18px] w-auto"
                />
              </div>
            ))}
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-16"
            style={{ background: "linear-gradient(90deg, #111113 0%, rgba(17,17,19,0) 100%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-16"
            style={{ background: "linear-gradient(270deg, #111113 0%, rgba(17,17,19,0) 100%)" }}
          />
        </div>
      </Container>
    </section>
  );
}
