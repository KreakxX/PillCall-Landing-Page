"use client";

import Script from "next/script";

export default function DataPolicy() {
  return (
    <main className="min-h-screen bg-[--background] text-[--foreground] font-sans">
      <div className="relative overflow-hidden border-b border-[--border]">
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[--border] bg-[--secondary] text-xs font-medium tracking-widest uppercase text-[--muted-foreground]">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "oklch(0.637 0.237 259.815)" }}
            />
            Legal
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-none"
            style={{
              fontFamily: "'Geist', sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            Datenschutzrichtlinie
          </h1>

          <p className="text-[--muted-foreground] text-lg max-w-xl leading-relaxed">
            Wir verpflichten uns zur Transparenz darüber, wie wir deine
            persönlichen Daten sammeln, verwenden und schützen.
          </p>

          {/* Meta row */}
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-[--muted-foreground]">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Zuletzt aktualisiert:{" "}
              {new Date().toLocaleDateString("de-DE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              DSGVO-konform
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <div
          className="rounded-2xl border border-[--border] bg-[--card] p-6 md:p-10 shadow-sm"
          style={{ color: "var(--card-foreground)" }}
        >
          <div
            {...({
              name: "termly-embed",
            } as any)}
            data-id="c09b3f83-1041-499a-acf1-09e2a147a0e3"
          />
        </div>

        <p className="mt-8 text-center text-sm text-[--muted-foreground]">
          Fragen zu unseren Datenschutzpraktiken?{" "}
          <a
            href="mailto:privacy@yourdomain.com"
            className="underline underline-offset-4 transition-colors"
            style={{ color: "oklch(0.637 0.237 259.815)" }}
          >
            Kontaktiere unser Datenschutzteam
          </a>
        </p>
      </div>

      <Script
        id="termly-script"
        src="https://app.termly.io/embed-policy.min.js"
        strategy="afterInteractive"
      />
    </main>
  );
}
