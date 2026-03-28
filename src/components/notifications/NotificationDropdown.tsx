"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useNotifications, useMarkAllRead } from "@/hooks/useNotifications";
import { useLanguage } from "@/context/LanguageContext";
import NotificationItem from "./NotificationItem";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const { data } = useNotifications(1);
  const markAllRead = useMarkAllRead();

  const notifications = data?.notifications ?? [];
  const unread = data?.unreadCount ?? 0;
  const preview = notifications.slice(0, 5);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer relative p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={t.nav.notifications}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center leading-none">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{t.notifications.title}</h3>
              {unread > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 text-xs font-bold">
                  {unread}
                </span>
              )}
            </div>
            {unread > 0 && (
              <button
                onClick={() => markAllRead.mutate()}
                className="text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700 font-medium transition-colors"
              >
                {t.notifications.markAllRead}
              </button>
            )}
          </div>

          {preview.length === 0 ? (
            <div className="py-12 px-4 text-center">
              <div className="text-3xl mb-2">🔔</div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{t.notifications.noNotifications}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t.notifications.noNotificationsDesc}</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {preview.map((n) => (
                <li key={n.id}>
                  <NotificationItem notification={n} onClick={() => setOpen(false)} />
                </li>
              ))}
            </ul>
          )}

          {notifications.length > 0 && (
            <div className="border-t border-gray-100 dark:border-gray-800">
              <Link
                href="/notifications"
                onClick={() => setOpen(false)}
                className="cursor-pointer flex items-center justify-center gap-1.5 w-full px-4 py-3 text-sm font-medium text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
              >
                {t.notifications.viewAll}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
