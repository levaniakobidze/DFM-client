import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Create an Account",
  description:
    "Join DareMe for free. Create an account and start browsing, accepting, and posting dares today.",
  openGraph: {
    title: "Join DareMe — Create a Free Account",
    description: "Sign up and start earning real rewards by completing fun challenges.",
    url: "https://dareme.app/register",
  },
};

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
