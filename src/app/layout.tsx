import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ToastProvider } from "@/context/ToastContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import QueryProvider from "@/providers/QueryProvider";

const bpgGlaho = localFont({
  src: "../../public/fonts/bpg_glaho.ttf",
  variable: "--font-bpg-glaho",
  display: "swap",
});

const BASE_URL = "https://dareme.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "DareMe — Get Paid to Take on Challenges",
    template: "%s | DareMe",
  },
  description:
    "Browse, create and complete fun safe challenges for real rewards. Join thousands of daring users and start earning today.",
  keywords: ["dare", "challenges", "earn money", "rewards", "fun", "social", "DareMe"],
  authors: [{ name: "DareMe" }],
  openGraph: {
    type: "website",
    siteName: "DareMe",
    title: "DareMe — Get Paid to Take on Challenges",
    description:
      "Browse, create and complete fun safe challenges for real rewards.",
    url: BASE_URL,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "DareMe" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DareMe — Get Paid to Take on Challenges",
    description:
      "Browse, create and complete fun safe challenges for real rewards.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bpgGlaho.variable} h-full antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200">
        <ThemeProvider>
          <LanguageProvider>
            <QueryProvider>
              <ToastProvider>
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </ToastProvider>
            </QueryProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
