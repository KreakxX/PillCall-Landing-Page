import {
  Bell,
  Calendar,
  Users,
  Shield,
  Smartphone,
  BarChart3,
  PhoneCall,
} from "lucide-react";

const features = [
  {
    icon: PhoneCall,
    title: "AI Reminder Calls",
    description:
      "Our AI calls you exactly when it’s time to take your medication | hands-free and reliable.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description:
      "Set up complex medication schedules with ease. Daily, weekly, or custom intervals.",
  },
  {
    icon: Users,
    title: "Family Sharing",
    description:
      "Keep caregivers and family informed. Share medication status with trusted contacts.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-muted/30 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Features
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to manage your medications
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            PillCall combines powerful features with a simple interface to make
            medication management effortless.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border bg-background p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
