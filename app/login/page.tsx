"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/LandingContext";
import { User } from "@/interfaces/user";
export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { setUser } = useUser();
  const login = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const user: User = await res.json();
      console.log("Login successful, user data:", user);
      setUser(user);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const stored = localStorage.getItem("app_user");
      console.log("Before navigation - localStorage contains:", stored);

      router.push("/account/dashboard");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "https://pillcall.duckdns.org:8050/pillcall/auth/google/register?source=web";
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <Link href="/" className="mb-6 flex items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
                <img
                  src={"PillCallIcon.png"}
                  className="h-10 w-10 text-primary-foreground"
                />
              </div>
              <h1>
                Bei deinem Konto anmelden, um es anzusehen oder zu löschen
              </h1>
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-background  p-8 shadow-sm">
            <div className="gap-3 flex flex-col">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  type="email"
                  placeholder="du@beispiel.com"
                  className="h-11 bg-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Passwort</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type={showPassword ? "text" : "password"}
                    placeholder="Gib dein Passwort ein"
                    className="h-11 pr-10 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                onClick={() => {
                  login();
                }}
                type="submit"
                className="mt-2 h-11 w-full"
              >
                Anmelden
              </Button>
              <Button
                onClick={() => {
                  handleGoogleLogin();
                }}
                type="submit"
                className="mt-2 h-11 w-full"
              >
                Mit Google anmelden
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
