"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pill, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <img
              src={"PillCallIcon.png"}
              className="h-10 w-10 text-primary-foreground"
            />
          </div>
          <span className="text-xl font-semibold text-foreground">
            PillCall
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Funktionen
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Wie es funktioniert
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild>
            <Link href="/login">Anmelden</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Konto löschen</Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Funktionen
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Wie es funktioniert
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Preise
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Button asChild>
                <Link href="/login">Anmelden</Link>
              </Button>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Button asChild>
                <Link href="/login">Konto löschen</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
