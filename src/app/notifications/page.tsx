"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { Skeleton } from "@/components/ui/Skeleton";
import Pagination from "@/components/ui/Pagination";
import NotificationItem from "@/components/notifications/NotificationItem";
import { useNotifications, useMarkAllRead } from "@/hooks/useNotifications";
import type { Notification } from "@/services/notification.service";
import { useLanguage } from "@/context/LanguageContext";

function groupByDate(notifications: Notification[]): Record<string, Notification[]> {
  const groups: Record<string, Notification[]> = { today: [], yesterday: [], earlier: [] };
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterdayStart = todayStart - 86400000;

  for (const n of notifications) {
    const ts = new Date(n.createdAt).getTime();
    if (ts >= todayStart) groups.today.push(n);
    else if (ts >= yesterdayStart) groups.yesterday.push(n);
    else groups.earlier.push(n);
  }
  return groups;
}

export default function NotificationsPage() {
  const { t } = useLanguage();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useNotifications(page);
  const markAllRead = useMarkAllRead();

  const notifications = data?.notifications ?? [];
  const unread = data?.unreadCount ?? 0;
  const pagination = data?.pagination;
  const groups = groupByDate(notifications);

  const sections = [
    { key: "today",     label: t.notifications.today,     items: groups.today     },
    { key: "yesterday", label: t.notifications.yesterday,  items: groups.yesterday },
    { key: "earlier",   label: t.notifications.earlier,    items: groups.earlier   },
  ].filter((s) => s.items.length > 0);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-3">
          <SectionTitle title={t.notifications.title} />
          {unread > 0 && (
            <span className="mt-1 px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 text-xs font-bold">
              {unread}
            </span>
          )}
        </div>
        {unread > 0 && (
          <Button variant="outline" size="sm" onClick={() => markAllRead.mutate()} disabled={markAllRead.isPending}>
            {t.notifications.markAllRead}
          </Button>
        )}
      </div>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-2xl" />)}
        </div>
      )}

      {!isLoading && notifications.length === 0 && (
        <Card>
          <div className="flex flex-col items-center py-12 gap-3">
            <div className="text-4xl">🔔</div>
            <p className="font-semibold text-gray-900 dark:text-white">{t.notifications.noNotifications}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">{t.notifications.noNotificationsDesc}</p>
            <Link href="/feed" className="mt-2"><Button size="sm">{t.nav.browseDares}</Button></Link>
          </div>
        </Card>
      )}

      {!isLoading && notifications.length > 0 && unread === 0 && (
        <div className="flex items-center gap-2 mb-6 px-1">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.notifications.allCaughtUp}</p>
        </div>
      )}

      {!isLoading && sections.length > 0 && (
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.key}>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-1">
                {section.label}
              </p>
              <Card padding={false} className="overflow-hidden">
                <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                  {section.items.map((n) => (
                    <li key={n.id}><NotificationItem notification={n} /></li>
                  ))}
                </ul>
              </Card>
            </div>
          ))}
          {pagination && <Pagination page={page} totalPages={pagination.totalPages} onChange={setPage} />}
        </div>
      )}
    </div>
  );
}
