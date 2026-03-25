"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";
import { useLanguage, Locale } from "@/context/LanguageContext";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuthStore();
  const { t, locale, setLocale } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: "/feed", label: t.nav.browseDares },
    { href: "/create", label: t.nav.createDare },
  ];

  const toggleLocale = () => setLocale(locale === "en" ? "ka" : "en");

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const userInitial = user?.name?.charAt(0).toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-violet-600 tracking-tight shrink-0">
          DareMe
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-gray-900 transition-colors whitespace-nowrap">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLocale}
            className="px-2.5 py-1 text-xs font-bold border border-gray-200 rounded-lg text-gray-600 hover:border-violet-400 hover:text-violet-600 transition-colors"
          >
            {locale === "en" ? "KA" : "EN"}
          </button>

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-gray-200 hover:border-violet-400 transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">
                  {userInitial}
                </span>
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <span>👤</span> {t.nav.profile}
                  </Link>
                  <Link
                    href="/wallet"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <span>💳</span> {t.nav.wallet}
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    onClick={() => { logout(); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <span>🚪</span> {t.nav.signOut}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">{t.nav.signIn}</Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">{t.nav.getStarted}</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile right: lang toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleLocale}
            className="px-2.5 py-1 text-xs font-bold border border-gray-200 rounded-lg text-gray-600 hover:border-violet-400 hover:text-violet-600 transition-colors"
          >
            {locale === "en" ? "KA" : "EN"}
          </button>
          <button
            className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
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
                <div className="flex items-center gap-2.5 py-1">
                  <span className="w-8 h-8 rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {userInitial}
                  </span>
                  <p className="text-sm text-gray-700 font-medium">{user?.name}</p>
                </div>
                <Link href="/profile" onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors">
                  {t.nav.profile}
                </Link>
                <Link href="/wallet" onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors">
                  {t.nav.wallet}
                </Link>
                <Button variant="outline" size="sm" className="w-full" onClick={() => { logout(); setMobileOpen(false); }}>
                  {t.nav.signOut}
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">{t.nav.signIn}</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">{t.nav.getStarted}</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
