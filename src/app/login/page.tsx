"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useLanguage } from "@/context/LanguageContext";
import AuthShell from "@/components/auth/AuthShell";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";

export default function LoginPage() {
  const { t } = useLanguage();
  const { signInWithGoogle } = useAuthStore();
  const [isPending, setIsPending] = useState(false);

  async function handleGoogle() {
    setIsPending(true);
    await signInWithGoogle();
  }

  return (
    <AuthShell
      title={t.auth.loginTitle}
      subtitle={t.auth.loginSubtitle}
      footer={
        <>
          {t.auth.noAccount}{" "}
          <Link href="/register" className="font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300">
            {t.auth.signUpLink}
          </Link>
        </>
      }
    >
      <GoogleAuthButton
        onClick={handleGoogle}
        isPending={isPending}
        label={t.auth.signInWithGoogle}
        pendingLabel={t.auth.signingIn}
      />
    </AuthShell>
  );
}
