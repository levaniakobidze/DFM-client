"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import { Skeleton } from "@/components/ui/Skeleton";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { useWallet } from "@/hooks/useWallet";
import { useLanguage } from "@/context/LanguageContext";
import type { Transaction } from "@/services/wallet.service";

/* ── animated counter ── */
function useCounter(target: number, duration = 800) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(parseFloat((eased * target).toFixed(2)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

type FilterType = "all" | "earned" | "payout";

function WalletContent() {
  const { t } = useLanguage();
  const { data, isLoading } = useWallet();
  const [filter, setFilter] = useState<FilterType>("all");

  const animatedBalance = useCounter(data?.balance ?? 0);
  const animatedPending = useCounter(data?.pending ?? 0);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-5">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-48 rounded-2xl" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-24 rounded-2xl" />
          <Skeleton className="h-24 rounded-2xl" />
        </div>
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  if (!data) return null;

  const totalEarned = data.transactions
    .filter((tx) => tx.type === "earned")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalPayout = data.transactions
    .filter((tx) => tx.type === "payout")
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  const filtered: Transaction[] =
    filter === "all"
      ? data.transactions
      : data.transactions.filter((tx) => tx.type === filter);

  const filters: { key: FilterType; label: string }[] = [
    { key: "all",    label: t.wallet.filterAll    },
    { key: "earned", label: t.wallet.filterEarned },
    { key: "payout", label: t.wallet.filterPayout },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <SectionTitle title={t.wallet.title} subtitle={t.wallet.subtitle} />

      {/* ── Balance hero card ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-700 p-6 text-white shadow-xl shadow-violet-900/30">
        {/* decorative orbs */}
        <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-indigo-400/20 blur-2xl" />

        <div className="relative z-10">
          <p className="text-sm font-medium text-violet-200 mb-1">{t.wallet.availableBalance}</p>
          <p className="text-5xl font-bold tracking-tight mb-1">
            ${animatedBalance.toFixed(2)}
          </p>
          <p className="text-xs text-violet-300 mb-6">{t.wallet.pendingNote}</p>
          <Button variant="secondary" size="sm">{t.wallet.requestPayout}</Button>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 gap-4">
        {/* Pending */}
        <Card className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-base">⏳</span>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{t.wallet.pendingRewards}</p>
          </div>
          <p className="text-2xl font-bold text-amber-500">${animatedPending.toFixed(2)}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">{t.wallet.pendingSubtext}</p>
        </Card>

        {/* Total earned */}
        <Card className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-7 h-7 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-base">💸</span>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{t.wallet.totalEarned}</p>
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">${totalEarned.toFixed(2)}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">{t.wallet.totalPayouts}: ${totalPayout.toFixed(2)}</p>
        </Card>
      </div>

      {/* ── Transaction history ── */}
      <div>
        {/* Header + filters */}
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">{t.wallet.transactionHistory}</h2>
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            {filters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  filter === key
                    ? "bg-white dark:bg-gray-700 text-violet-600 dark:text-violet-400 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <Card>
            <div className="flex flex-col items-center py-10 gap-3 text-center">
              <span className="text-4xl">💳</span>
              <p className="font-semibold text-gray-900 dark:text-white">{t.wallet.emptyWallet}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">{t.wallet.emptyWalletDesc}</p>
              <Link href="/feed" className="mt-1">
                <Button size="sm">{t.wallet.browseDares}</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <Card padding={false} className="overflow-hidden">
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((tx) => (
                <li key={tx.id} className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  {/* Type icon */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 ${
                    tx.type === "earned"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-red-100 dark:bg-red-900/30"
                  }`}>
                    {tx.type === "earned" ? "🎯" : "💳"}
                  </div>

                  {/* Label + date */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{tx.label}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-gray-400 dark:text-gray-500">{tx.date}</p>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        tx.type === "earned"
                          ? "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400"
                          : "bg-red-100 dark:bg-red-900/40 text-red-500 dark:text-red-400"
                      }`}>
                        {tx.type === "earned" ? t.wallet.earned : t.wallet.payout}
                      </span>
                    </div>
                  </div>

                  {/* Amount */}
                  <span className={`text-sm font-bold tabular-nums shrink-0 ${
                    tx.amount > 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-500 dark:text-red-400"
                  }`}>
                    {tx.amount > 0 ? "+" : "−"}${Math.abs(tx.amount).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function WalletPage() {
  return (
    <ProtectedRoute>
      <WalletContent />
    </ProtectedRoute>
  );
}
