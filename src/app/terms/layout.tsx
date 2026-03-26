import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read DareMe's terms and conditions — the rules that govern your use of the platform.",
  openGraph: {
    title: "Terms & Conditions | DareMe",
    description: "The rules that govern your use of the DareMe platform.",
    url: "https://dareme.app/terms",
  },
};

export default function TermsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
