import CtaSection from "@/components/sections/CtaSection";
import FeatureFocusSection from "@/components/sections/FeatureFocusSection";
import FeatureWorkflowSection from "@/components/sections/FeatureWorkflowSection";
import FooterSection from "@/components/sections/FooterSection";
import HeaderSection from "@/components/sections/HeaderSection";
import HeyMaxSection from "@/components/sections/HeyMaxSection";
import HeroSection from "@/components/sections/HeroSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import MobileLandingSections from "@/components/sections/mobile/MobileLandingSections";

export default function Home() {
  return (
    <>
      <HeaderSection showBlog={false} />
      <div className="relative min-h-screen overflow-x-clip bg-[#111113] max-[1024px]:hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[1080px]"
          style={{
            backgroundImage:
              "radial-gradient(#464646 1px, transparent 1px), radial-gradient(#464646 1px, transparent 1px)",
            backgroundSize: "40px 40px, 40px 40px",
            backgroundPosition: "0 0, 20px 20px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[1080px]"
          style={{
            background: "linear-gradient(180deg, rgba(17,17,19,0) 0%, #111113 100%)",
          }}
        />
        <main className="relative z-10">
          <HeroSection />
          <SocialProofSection />
          <FeatureFocusSection />
          <FeatureWorkflowSection />
          <HeyMaxSection />
          <CtaSection />
        </main>
        <div className="relative z-10">
          <FooterSection />
        </div>
      </div>
      <div className="min-[1025px]:hidden">
        <MobileLandingSections />
      </div>
    </>
  );
}
