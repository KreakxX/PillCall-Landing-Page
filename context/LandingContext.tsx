"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface User {
  email: string;
  password: string | null;
  telephonumber_verified_at: string | null;
  id: string;
  onboarding: boolean;
  leftCalls: number;
  subscriptionPlan: string;
  telephonenumber: string;
  name: string;
  timezone: string;
  gender: string;
  medicationLimit: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  clearUser: () => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("app_user");
    console.log(
      "UserProvider mount - storedUser from localStorage:",
      storedUser,
    );

    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    console.log("UserProvider - user changed:", user);
    if (user) {
      console.log("Saving user to localStorage:", user);
      localStorage.setItem("app_user", JSON.stringify(user));
    } else {
      console.log("Removing user from localStorage");
      localStorage.removeItem("app_user");
    }
  }, [user]);

  const setUser = (user: User | null) => {
    setUserState(user);
  };

  const updateUser = (updates: Partial<User>) => {
    setUserState((prev) => {
      if (!prev) return prev;
      return { ...prev, ...updates };
    });
  };

  const clearUser = () => {
    setUserState(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        clearUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
