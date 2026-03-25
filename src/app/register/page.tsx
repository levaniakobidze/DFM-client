"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";
import { useLanguage } from "@/context/LanguageContext";

const DEMO_USER = { id: "1", name: "Alex M.", email: "alex@example.com" };

export default function RegisterPage() {
  const { t } = useLanguage();
  const { login } = useAuthStore();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setTimeout(() => {
      login(DEMO_USER);
      router.push("/feed");
    }, 800);
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-extrabold text-violet-600 tracking-tight">
            DareMe
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-1">{t.auth.registerTitle}</h1>
          <p className="text-sm text-gray-500">{t.auth.registerSubtitle}</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t.auth.nameLabel}
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder={t.auth.namePlaceholder}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t.auth.emailLabel}
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder={t.auth.emailPlaceholder}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t.auth.passwordLabel}
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder={t.auth.passwordPlaceholder}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow"
              />
            </div>

            <Button type="submit" size="lg" className="w-full mt-2" disabled={isPending}>
              {isPending ? t.auth.creatingAccount : t.auth.createAccount}
            </Button>

          </form>

          {/* Demo note */}
          <p className="text-center text-xs text-gray-400 mt-5 pt-5 border-t border-gray-100">
            {t.auth.demoNote}
          </p>
        </div>

        {/* Footer link */}
        <p className="text-center text-sm text-gray-500 mt-5">
          {t.auth.haveAccount}{" "}
          <Link href="/login" className="text-violet-600 font-semibold hover:text-violet-700 transition-colors">
            {t.auth.signInLink}
          </Link>
        </p>

      </div>
    </div>
  );
}
