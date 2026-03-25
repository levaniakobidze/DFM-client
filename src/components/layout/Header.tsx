"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-violet-600 tracking-tight">
          DareMe
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
          <Link href="/feed" className="hover:text-gray-900 transition-colors">
            Browse Dares
          </Link>
          <Link href="/create" className="hover:text-gray-900 transition-colors">
            Create a Dare
          </Link>
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm">Sign In</Button>
          <Button variant="primary" size="sm">Get Started</Button>
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
          <Link
            href="/feed"
            className="text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Browse Dares
          </Link>
          <Link
            href="/create"
            className="text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Create a Dare
          </Link>
          <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
            <Button variant="outline" size="sm" className="w-full">Sign In</Button>
            <Button variant="primary" size="sm" className="w-full">Get Started</Button>
          </div>
        </div>
      )}
    </header>
  );
}
