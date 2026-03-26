import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how DareMe collects, uses, and protects your personal information.",
  openGraph: {
    title: "Privacy Policy | DareMe",
    description: "How DareMe collects, uses, and protects your personal information.",
    url: "https://dareme.app/privacy",
  },
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
