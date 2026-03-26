import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Create a Dare",
  description:
    "Post your own challenge, set a reward, and watch people step up. Creating a dare takes less than a minute.",
  openGraph: {
    title: "Create a Dare | DareMe",
    description: "Post your own challenge and set a reward. Watch people step up.",
    url: "https://dareme.app/create",
  },
};

export default function CreateLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
