import { api } from "@/lib/api";

export interface Transaction {
  id: string;
  label: string;
  amount: number;
  date: string;
  type: "earned" | "payout";
}

export interface WalletData {
  balance: number;
  pending: number;
  totalEarned: number;
  transactions: Transaction[];
}

interface BackendSummary {
  userId: string;
  pendingBalance: number;
  availableBalance: number;
  totalEarned: number;
}

interface BackendTransaction {
  id: string;
  type: string;
  amount: string;
  status: string;
  createdAt: string;
  dare: { id: string; title: string } | null;
}

interface BackendTransactionList {
  transactions: BackendTransaction[];
  pagination: { total: number; page: number; limit: number; totalPages: number };
}

function toFrontendTx(tx: BackendTransaction): Transaction {
  const isPayout = tx.type === "WITHDRAWAL";
  const amount = parseFloat(tx.amount);
  const label = tx.dare?.title ?? (isPayout ? "Payout" : "Reward");
  const date = new Date(tx.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return {
    id: tx.id,
    label,
    amount: isPayout ? -Math.abs(amount) : amount,
    date,
    type: isPayout ? "payout" : "earned",
  };
}

export async function fetchWallet(userId: string): Promise<WalletData> {
  const [summary, txList] = await Promise.all([
    api.get<BackendSummary>(`/wallet/${userId}`),
    api.get<BackendTransactionList>(`/wallet/${userId}/transactions?limit=50`),
  ]);

  return {
    balance: Number(summary.availableBalance),
    pending: Number(summary.pendingBalance),
    totalEarned: Number(summary.totalEarned),
    transactions: txList.transactions.map(toFrontendTx),
  };
}
