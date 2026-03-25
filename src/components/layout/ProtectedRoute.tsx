"use client";

import { ReactNode } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Button from "@/components/ui/Button";

interface ProtectedRouteProps {
  children: ReactNode;
}

const DEMO_USER = { id: "1", name: "Alex M.", email: "alex@example.com" };

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn, login } = useAuthStore();

  if (!isLoggedIn) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Sign in to continue</h2>
        <p className="text-gray-500 mb-6">
          You need to be signed in to access this page.
        </p>
        <Button size="lg" onClick={() => login(DEMO_USER)}>
          Sign In (Demo)
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
