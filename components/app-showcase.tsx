"use client";
import Script from "next/script";

export function AppShowcase() {
  return (
    <section id="how-it-works" className="bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Wie es funktioniert
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Einfache Einrichtung, mächtige Ergebnisse
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Starte in Minuten. Füge deine Medikamente hinzu, stelle deinen
            Zeitplan ein und lass PillCall den Rest erledigen.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {[
            {
              step: "01",
              title: "Medikamente hinzufügen",
              description:
                "Scanne oder gib deine Rezepte manuell ein. Wir speichern alle Details.",
              img: "/AddPAge-portrait.png",
            },
            {
              step: "02",
              title: "Stelle deinen Zeitplan ein",
              description:
                "Wähle aus, wann und wie oft du jedes Medikament einnehmen musst.",
              img: "/ReminderAdd-portrait.png",
            },
            {
              step: "03",
              title: "Erhalte Erinnerungen",
              description:
                "Erhalte zeitnahe Benachrichtigungen und verfolge deinen Fortschritt im Laufe der Zeit.",
              img: "/Calendar-portrait.png",
            },
          ].map((item, index) => (
            <div key={item.step} className="relative">
              {index < 2 && (
                <div className="absolute left-1/2 top-24 hidden h-0.5 w-full -translate-y-1/2 bg-gradient-to-r from-primary/50 to-transparent lg:block" />
              )}
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
                  {item.step}
                </div>

                <div className="mb-6 w-full overflow-hidden rounded-xl border border-border bg-muted shadow-lg">
                  <div className="flex a items-center justify-center p-6">
                    <img src={item.img} className="w-full h-full" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
