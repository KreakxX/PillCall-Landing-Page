"use client";

import { useUser } from "@/context/LandingContext";
import { User } from "@/interfaces/user";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user, loading } = useUser();
  const router = useRouter();

  console.log("Dashboard - loading:", loading, "user:", user);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (user == null) {
    console.log("User is null, redirecting to login");
    return null;
  }

  console.log("User loaded, rendering dashboard");
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome, {user.name}
            </h1>
            <p className="text-muted-foreground">
              Here is your account overview
            </p>
          </div>

          <button className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:opacity-80 transition">
            Sign Out
          </button>
        </div>

        <div className="bg-card text-card-foreground rounded-xl border p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Account Details</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Info label="User ID" value={user.id} />
            <Info label="Email" value={user.email} />
            <Info label="Phone Number" value={user.telephonenumber} />
            <Info
              label="Phone Verified"
              value={
                user.telephonumber_verified_at
                  ? new Date(user.telephonumber_verified_at).toLocaleString()
                  : "Not Verified"
              }
            />
            <Info label="Gender" value={user.gender} />
            <Info label="Timezone" value={user.timezone} />
            <Info
              label="Onboarding Completed"
              value={user.onboarding ? "Yes" : "No"}
            />
            <Info label="Subscription Plan" value={user.subscriptionPlan} />
            <Info label="Calls Left" value={user.leftCalls.toString()} />
            <Info
              label="Medication Limit"
              value={user.medicationLimit.toString()}
            />
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-xl border p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-destructive mb-4">
            Danger Zone
          </h2>

          <button
            onClick={() => {
              router.push("/account/delete");
            }}
            className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:opacity-90 transition"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium break-words">{value}</p>
    </div>
  );
}
