import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { AppShowcase } from "@/components/app-showcase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
export default async function LandingPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (token) {
    const verified = jwt.verify(token.value, process.env.JWT_SECRET!);

    if (verified) {
      redirect("/account/dashboard");
    }
  }

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
