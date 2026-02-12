import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { AppShowcase } from "@/components/app-showcase";
import { Footer } from "@/components/footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <AppShowcase />
      </main>
    </div>
  );
}
