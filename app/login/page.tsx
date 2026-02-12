"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pill, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const login = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/account/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <Link href="/" className="mb-6 flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <img
                  src={"PillCallIcon.png"}
                  className="h-10 w-10 text-primary-foreground"
                />
              </div>
              <h1>Login to view or delete your Account</h1>
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-background  p-8 shadow-sm">
            <div className="gap-3 flex flex-col">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 bg-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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
                Sign In
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link href="#" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
