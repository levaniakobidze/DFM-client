"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import { Skeleton } from "@/components/ui/Skeleton";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { useWallet } from "@/hooks/useWallet";

function WalletContent() {
  const { data, isLoading } = useWallet();

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-20 rounded-2xl" />
        <Skeleton className="h-60 rounded-2xl" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <SectionTitle title="Wallet" subtitle="Your balance and transactions." />

      {/* Balance card */}
      <div className="bg-violet-600 rounded-2xl p-6 text-white">
        <p className="text-sm opacity-75 mb-1">Available Balance</p>
        <p className="text-4xl font-bold mb-5">${data.balance.toFixed(2)}</p>
        <Button variant="secondary" size="sm">Request Payout</Button>
      </div>

      {/* Pending rewards */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">Pending Rewards</p>
            <p className="text-xs text-gray-500 mt-0.5">Awaiting proof approval</p>
          </div>
          <span className="text-2xl font-bold text-amber-500">${data.pending.toFixed(2)}</span>
        </div>
      </Card>

      {/* Transaction history */}
      <div>
        <SectionTitle title="Transaction History" className="mb-4" />
        <Card padding={false}>
          <ul className="divide-y divide-gray-100">
            {data.transactions.map((tx) => (
              <li key={tx.id} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{tx.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{tx.date}</p>
                </div>
                <span className={`text-sm font-semibold ${tx.amount > 0 ? "text-green-600" : "text-red-500"}`}>
                  {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </Card>
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
