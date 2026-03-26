"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn, user, logout } = useAuthStore();
  const { t, locale, setLocale } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: "/feed", label: t.nav.browseDares },
    { href: "/create", label: t.nav.createDare },
  ];

  const toggleLocale = () => setLocale(locale === "en" ? "ka" : "en");

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-xl bg-white/70 dark:bg-gray-900/65 border-b border-white/40 dark:border-gray-700/70 shadow-lg shadow-gray-900/10"
          : "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className={`font-bold text-violet-600 tracking-tight shrink-0 transition-all duration-300 ${
            isScrolled ? "text-3xl" : "text-2xl"
          }`}
        >
          DareMe
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Notification bell (logged-in only) */}
          {isLoggedIn && <NotificationDropdown />}

          {/* Language toggle */}
          <button
            onClick={toggleLocale}
            className="px-2.5 py-1 text-xs font-bold border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-violet-400 hover:text-violet-600 dark:hover:border-violet-500 dark:hover:text-violet-400 transition-colors"
          >
            {locale === "en" ? "KA" : "EN"}
          </button>

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-gray-200 dark:border-gray-600 hover:border-violet-400 dark:hover:border-violet-500 transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">
                  {userInitial}
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name}</span>
                <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1 z-50">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span>👤</span> {t.nav.profile}
                  </Link>
                  <Link
                    href="/wallet"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span>💳</span> {t.nav.wallet}
                  </Link>
                  {user?.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
                    >
                      <span>🛡️</span> {t.admin.adminPanel}
                    </Link>
                  )}
                  <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                  <button
                    onClick={() => { logout(); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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

        {/* Mobile right: dark toggle + lang toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <button
            onClick={toggleLocale}
            className="px-2.5 py-1 text-xs font-bold border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-violet-400 hover:text-violet-600 transition-colors"
          >
            {locale === "en" ? "KA" : "EN"}
          </button>
          <button
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
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
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2.5 py-1">
                  <span className="w-8 h-8 rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {userInitial}
                  </span>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{user?.name}</p>
                </div>
                <Link href="/profile" onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  {t.nav.profile}
                </Link>
                <Link href="/wallet" onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  {t.nav.wallet}
                </Link>
                <Link href="/notifications" onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  {t.nav.notifications}
                </Link>
                {user?.role === "admin" && (
                  <Link href="/admin" onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors">
                    🛡️ {t.admin.adminPanel}
                  </Link>
                )}
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
