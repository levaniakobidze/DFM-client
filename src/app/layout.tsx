import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { ToastProvider } from "@/context/ToastContext";
import QueryProvider from "@/providers/QueryProvider";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DareMe — Get paid to take on challenges",
  description: "Browse, create and complete fun safe challenges for real rewards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 font-sans">
        <QueryProvider>
          <ToastProvider>
            <Header />
            <main className="flex-1">{children}</main>
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
