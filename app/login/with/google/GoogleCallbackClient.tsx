"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/LandingContext";

export default function GoogleCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useUser();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    const authenticate = async () => {
      try {
        const res = await fetch(
          `/api/login/google?token=${encodeURIComponent(token)}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!res.ok) {
          router.replace("/login");
          return;
        }

        const data = await res.json();
        if (data?.user) {
          setUser(data.user);
          router.replace("/account/dashboard");
        } else {
          router.replace("/login");
        }
      } catch (error) {
        console.error("Google callback error:", error);
        router.replace("/login");
      }
    };

    authenticate();
  }, [router, searchParams, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-lg font-medium text-gray-900">
          Anmeldung wird verarbeitet...
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Bitte warten Sie einen Moment.
        </p>
      </div>
    </div>
  );
}
