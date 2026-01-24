import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,oklch(0.93_0.05_255)_0%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Never Miss Your <span className="text-primary">Medication</span>{" "}
              Again
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Smart reminders, easy tracking, and personalized schedules.
              PillCall helps you stay on top of your health with intelligent
              medication management.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {[
                "Smart reminders at the right time",
                "Track all your prescriptions",
                "Share with family & caregivers",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-foreground"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <img
              className="w-4/6 h-4/6"
              src="/AppScreenshot1.png"
              alt="App Screenshot"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
