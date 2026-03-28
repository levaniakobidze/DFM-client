"use client";

import { ReactNode } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { isLoggedIn, isLoading, user } = useAuthStore();

  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-violet-600 border-t-transparent animate-spin mx-auto" />
      </div>
    );
  }

  if (!isLoggedIn || user?.email !== "levaniakobidze25@gmail.com") {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-3xl mx-auto mb-5">
          🛡️
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Admin Access Only</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto">
          You need admin privileges to view this page.
        </p>
        <Link href="/login">
          <Button size="lg" className="px-8">Sign In</Button>
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
