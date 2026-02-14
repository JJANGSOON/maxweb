import Container from "../ui/Container";
import { SOCIAL_LOGOS } from "@/lib/constants";

export default function SocialProofSection() {
  return (
    <section className="mt-24" id="social-proof">
      <Container>
        <p className="text-center text-sm text-[#858585]">Trusted by industry leaders</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs tracking-[0.08em] text-[#d1d1d1] md:text-sm">
          {SOCIAL_LOGOS.map((logo) => (
            <span key={logo}>{logo}</span>
          ))}
        </div>
      </Container>
    </section>
  );
}
