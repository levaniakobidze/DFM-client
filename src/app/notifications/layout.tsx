import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Stay up to date with your dare activity and reward updates.",
  robots: { index: false, follow: false },
};

export default function NotificationsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
