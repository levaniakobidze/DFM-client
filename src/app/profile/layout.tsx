import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Profile",
  description: "View your dares, completed challenges, and activity.",
  robots: { index: false, follow: false },
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
