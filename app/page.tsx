import CtaSection from "@/components/sections/CtaSection";
import FeatureFocusSection from "@/components/sections/FeatureFocusSection";
import FeatureWorkflowSection from "@/components/sections/FeatureWorkflowSection";
import FooterSection from "@/components/sections/FooterSection";
import HeaderSection from "@/components/sections/HeaderSection";
import HeroSection from "@/components/sections/HeroSection";
import SocialProofSection from "@/components/sections/SocialProofSection";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#111113]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[1080px]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 12%, rgba(255, 204, 160, 0.22), rgba(255, 204, 160, 0) 42%), radial-gradient(circle at 82% 16%, rgba(132, 146, 211, 0.22), rgba(132, 146, 211, 0) 44%), radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 40px 40px, 40px 40px",
          backgroundPosition: "center, center, 0 0, 20px 20px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[1080px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,17,19,0) 0%, rgba(17,17,19,0.25) 48%, rgba(17,17,19,0.92) 100%)",
        }}
      />
      <HeaderSection />
      <main className="relative z-10 pb-16">
        <HeroSection />
        <SocialProofSection />
        <FeatureFocusSection />
        <FeatureWorkflowSection />
        <CtaSection />
      </main>
      <div className="relative z-10">
        <FooterSection />
      </div>
    </div>
  );
}
