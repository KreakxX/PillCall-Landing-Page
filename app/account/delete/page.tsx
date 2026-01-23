"use client";

import React, { useEffect } from "react";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Pill, AlertTriangle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteAccountPage() {
  const [confirmText, setConfirmText] = useState("");
  const router = useRouter();
  const [confirmations, setConfirmations] = useState({
    understand: false,
    dataLoss: false,
    noRecovery: false,
  });

  const isDeleteEnabled =
    confirmText === "DELETE" &&
    confirmations.understand &&
    confirmations.dataLoss &&
    confirmations.noRecovery;

  useEffect(() => {
    const getJWT = async () => {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      if (!res.ok) {
        router.push("/login");
      }
    };
    getJWT();
  }, [router]);

  const handleDelete = async () => {
    const res = await fetch("/api/account", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Pill className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              PillCall
            </span>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="rounded-2xl border border-destructive/30 bg-background p-8 shadow-sm">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Delete Account
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  This action is permanent and cannot be undone.
                </p>
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-destructive/5 p-4">
              <h2 className="mb-2 text-sm font-semibold text-foreground">
                What happens when you delete your account:
              </h2>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  All your medication data will be permanently deleted
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  Your reminder history and reports will be lost
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  Family sharing connections will be removed
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  Any active subscription will be cancelled
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="understand"
                  checked={confirmations.understand}
                  onCheckedChange={(checked) =>
                    setConfirmations((prev) => ({
                      ...prev,
                      understand: checked === true,
                    }))
                  }
                />
                <Label
                  htmlFor="understand"
                  className="text-sm leading-relaxed text-foreground"
                >
                  I understand that my account will be permanently deleted
                </Label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="dataLoss"
                  checked={confirmations.dataLoss}
                  onCheckedChange={(checked) =>
                    setConfirmations((prev) => ({
                      ...prev,
                      dataLoss: checked === true,
                    }))
                  }
                />
                <Label
                  htmlFor="dataLoss"
                  className="text-sm leading-relaxed text-foreground"
                >
                  I understand that all my data will be lost and cannot be
                  recovered
                </Label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="noRecovery"
                  checked={confirmations.noRecovery}
                  onCheckedChange={(checked) =>
                    setConfirmations((prev) => ({
                      ...prev,
                      noRecovery: checked === true,
                    }))
                  }
                />
                <Label
                  htmlFor="noRecovery"
                  className="text-sm leading-relaxed text-foreground"
                >
                  I want to proceed with deleting my account
                </Label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="confirm" className="text-sm text-foreground">
                Type{" "}
                <span className="font-mono font-semibold text-destructive">
                  DELETE
                </span>{" "}
                to confirm
              </Label>
              <Input
                id="confirm"
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type DELETE to confirm"
                className="h-11 font-mono"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row-reverse">
              <Button
                onClick={() => {
                  handleDelete();
                }}
                variant="destructive"
                disabled={!isDeleteEnabled}
                className="h-11 flex-1"
              >
                Permanently Delete Account
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 flex-1 bg-transparent"
                asChild
              >
                <Link href="/">Cancel</Link>
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Need help?{" "}
            <Link href="#" className="text-primary hover:underline">
              Contact support
            </Link>{" "}
            before deleting your account.
          </p>
        </div>
      </main>
    </div>
  );
}
