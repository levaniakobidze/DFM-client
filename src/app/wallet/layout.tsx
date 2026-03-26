import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Wallet",
  description: "View your balance, pending rewards, and transaction history.",
  robots: { index: false, follow: false },
};

export default function WalletLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
