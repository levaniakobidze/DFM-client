"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

const DEMO_USER = { id: "1", name: "Alex M.", email: "alex@example.com" };

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn, login } = useAuthStore();
  const { t } = useLanguage();

  if (!isLoggedIn) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 flex items-center justify-center text-3xl mx-auto mb-5">
          🔒
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t.protected.title}</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-7">{t.protected.desc}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login">
            <Button size="lg" className="px-8">{t.nav.signIn}</Button>
          </Link>
          <Button size="lg" variant="outline" className="px-8" onClick={() => login(DEMO_USER)}>
            {t.protected.signIn}
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
