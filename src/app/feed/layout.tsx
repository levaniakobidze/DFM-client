import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Browse Dares",
  description:
    "Explore hundreds of fun challenges posted by real people. Accept a dare, complete it, and earn real rewards.",
  openGraph: {
    title: "Browse Dares | DareMe",
    description:
      "Explore hundreds of fun challenges. Accept a dare, complete it, and earn real rewards.",
    url: "https://dareme.app/feed",
  },
};

export default function FeedLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
