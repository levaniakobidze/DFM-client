"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";

const DEMO_USER = { id: "1", name: "Alex M.", email: "alex@example.com" };

const navLinks = [
  { href: "/feed", label: "Browse Dares" },
  { href: "/create", label: "Create a Dare" },
  { href: "/profile", label: "Profile" },
  { href: "/wallet", label: "Wallet" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, user, login, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-violet-600 tracking-tight">
          DareMe
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-gray-900 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <span className="text-sm text-gray-600 font-medium">{user?.name}</span>
              <Button variant="ghost" size="sm" onClick={logout}>Sign Out</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => login(DEMO_USER)}>Sign In</Button>
              <Button variant="primary" size="sm" onClick={() => login(DEMO_USER)}>Get Started</Button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-500 hover:text-gray-900 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className="block w-5 h-0.5 bg-current" />
            <span className="block w-5 h-0.5 bg-current" />
            <span className="block w-5 h-0.5 bg-current" />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
            {isLoggedIn ? (
              <>
                <p className="text-sm text-gray-600 font-medium">{user?.name}</p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => { logout(); setMobileOpen(false); }}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" className="w-full" onClick={() => { login(DEMO_USER); setMobileOpen(false); }}>
                  Sign In
                </Button>
                <Button variant="primary" size="sm" className="w-full" onClick={() => { login(DEMO_USER); setMobileOpen(false); }}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
