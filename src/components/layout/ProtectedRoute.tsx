"use client";

import { ReactNode } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const DEMO_USER = { id: "1", name: "Alex M.", email: "alex@example.com" };

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn, login } = useAuthStore();
  const { t } = useLanguage();

  if (!isLoggedIn) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{t.protected.title}</h2>
        <p className="text-gray-500 mb-6">{t.protected.desc}</p>
        <Button size="lg" onClick={() => login(DEMO_USER)}>
          {t.protected.signIn}
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
