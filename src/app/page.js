import { HeroSection } from "@/components/landing/hero-section";
import { CodeDemo } from "@/components/landing/code-demo";
import { FeaturesSection } from "@/components/landing/features-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <HeroSection />
      <CodeDemo />
      <FeaturesSection />
    </main>
  );
}
