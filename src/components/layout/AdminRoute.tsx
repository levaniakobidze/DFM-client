"use client";

import { ReactNode } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Button from "@/components/ui/Button";

const DEMO_ADMIN = { id: "admin-1", name: "Admin", email: "admin@dareme.com", role: "admin" as const };

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { isLoggedIn, user, login } = useAuthStore();

  if (!isLoggedIn || user?.role !== "admin") {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-3xl mx-auto mb-5">
          🛡️
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Admin Access Only</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto">
          You need admin privileges to view this page.
        </p>
        <Button size="lg" className="px-8" onClick={() => login(DEMO_ADMIN)}>
          Login as Admin (Demo)
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
