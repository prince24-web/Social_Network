import { HeroSection } from "@/components/landing/HeroSection";
import { SupportedLanguages } from "@/components/landing/SupportedLanguages";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#050505]">
      <HeroSection />
      <SupportedLanguages />
      <FeatureGrid />
      <Footer />
    </main>
  );
}
