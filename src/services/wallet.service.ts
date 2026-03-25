// Replace mock data with real API calls when backend is ready.

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
  transactions: Transaction[];
}

const mockWalletData: WalletData = {
  balance: 15.0,
  pending: 30.0,
  transactions: [
    { id: "1", label: "Eat a spoonful of hot sauce", amount: 15, date: "Mar 24, 2026", type: "earned" },
    { id: "2", label: "Compliment 5 strangers", amount: 30, date: "Mar 20, 2026", type: "earned" },
    { id: "3", label: "Payout to bank", amount: -40, date: "Mar 18, 2026", type: "payout" },
    { id: "4", label: "Draw a portrait in 60 seconds", amount: 10, date: "Mar 15, 2026", type: "earned" },
    { id: "5", label: "Learn and perform a magic trick", amount: 25, date: "Mar 10, 2026", type: "earned" },
  ],
};

export async function fetchWallet(): Promise<WalletData> {
  await new Promise((r) => setTimeout(r, 500));
  return mockWalletData;
}
