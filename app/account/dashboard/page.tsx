"use client";

import { useUser } from "@/context/LandingContext";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Globe,
  CreditCard,
  Calendar,
  Shield,
  Trash2,
  LogOut,
} from "lucide-react";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, loading } = useUser();
  const router = useRouter();

  const signout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
    router.replace("/login");
  };

  useEffect(() => {
    const getJWT = async () => {
      const res = await fetch("/api/user", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        router.push("/login");
      }
    };
    getJWT();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-gray-500 text-sm">
            Dein Dashboard wird geladen...
          </p>
        </div>
      </div>
    );
  }

  if (user == null) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {user.name}
              </h1>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => {
              signout();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Account Overview
          </h2>
          <p className="text-gray-500 mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            label="Subscription"
            value={user.subscriptionPlan}
            icon={<CreditCard className="h-5 w-5 text-blue-500" />}
          />
          <StatCard
            label="Calls Remaining"
            value={user.leftCalls.toString()}
            icon={<Phone className="h-5 w-5 text-blue-500" />}
          />
          <StatCard
            label="Medication Limit"
            value={user.medicationLimit.toString()}
            icon={<Shield className="h-5 w-5 text-blue-500" />}
          />
        </div>

        {/* Account Details */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-gray-900">
              Personal Information
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            <InfoRow
              icon={<User className="h-4 w-4" />}
              label="User ID"
              value={user.id}
            />
            <InfoRow
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value={user.email}
            />
            <InfoRow
              icon={<Phone className="h-4 w-4" />}
              label="Phone"
              value={user.telephonenumber}
            />
            <InfoRow
              icon={<Shield className="h-4 w-4" />}
              label="Phone Verified"
              value={
                user.telephonumber_verified_at
                  ? new Date(
                      user.telephonumber_verified_at,
                    ).toLocaleDateString()
                  : "Not Verified"
              }
              status={user.telephonumber_verified_at ? "success" : "warning"}
            />
            <InfoRow
              icon={<User className="h-4 w-4" />}
              label="Gender"
              value={user.gender}
            />
            <InfoRow
              icon={<Globe className="h-4 w-4" />}
              label="Timezone"
              value={user.timezone}
            />
            <InfoRow
              icon={<Calendar className="h-4 w-4" />}
              label="Onboarding"
              value={user.onboarding ? "Completed" : "Pending"}
              status={user.onboarding ? "success" : "warning"}
            />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white border border-red-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-red-100 bg-red-50">
            <h3 className="font-semibold text-red-700">Danger Zone</h3>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-600 mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button
              onClick={() => router.push("/account/delete")}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  status,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  status?: "success" | "warning";
}) {
  return (
    <div className="px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-gray-400">{icon}</span>
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-900">{value}</span>
        {status && (
          <span
            className={`inline-flex h-2 w-2 rounded-full ${
              status === "success" ? "bg-green-500" : "bg-amber-500"
            }`}
          />
        )}
      </div>
    </div>
  );
}
