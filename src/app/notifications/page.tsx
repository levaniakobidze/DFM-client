"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import NotificationItem from "@/components/notifications/NotificationItem";
import { useNotificationStore, Notification } from "@/store/useNotificationStore";
import { useLanguage } from "@/context/LanguageContext";

function groupNotifications(notifications: Notification[]): Record<string, Notification[]> {
  const groups: Record<string, Notification[]> = { today: [], yesterday: [], earlier: [] };
  for (const n of notifications) {
    const t = n.time.toLowerCase();
    if (t.includes("just now") || t.includes("minutes ago") || t.includes("hour") || t.includes("hours ago")) {
      groups.today.push(n);
    } else if (t.includes("yesterday")) {
      groups.yesterday.push(n);
    } else {
      groups.earlier.push(n);
    }
  }
  return groups;
}

export default function NotificationsPage() {
  const { t } = useLanguage();
  const { notifications, markAllRead } = useNotificationStore();
  const unread = notifications.filter((n) => !n.read).length;
  const groups = groupNotifications(notifications);

  const sections = [
    { key: "today",     label: t.notifications.today,     items: groups.today     },
    { key: "yesterday", label: t.notifications.yesterday,  items: groups.yesterday },
    { key: "earlier",   label: t.notifications.earlier,    items: groups.earlier   },
  ].filter((s) => s.items.length > 0);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Page header */}
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
          <Button variant="outline" size="sm" onClick={markAllRead}>
            {t.notifications.markAllRead}
          </Button>
        )}
      </div>

      {/* Empty state */}
      {notifications.length === 0 && (
        <Card>
          <div className="flex flex-col items-center py-12 gap-3">
            <div className="text-4xl">🔔</div>
            <p className="font-semibold text-gray-900 dark:text-white">{t.notifications.noNotifications}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">
              {t.notifications.noNotificationsDesc}
            </p>
            <Link href="/feed" className="mt-2">
              <Button size="sm">{t.nav.browseDares}</Button>
            </Link>
          </div>
        </Card>
      )}

      {/* All caught up */}
      {notifications.length > 0 && unread === 0 && (
        <div className="flex items-center gap-2 mb-6 px-1">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.notifications.allCaughtUp}</p>
        </div>
      )}

      {/* Grouped notifications */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.key}>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-1">
              {section.label}
            </p>
            <Card padding={false} className="overflow-hidden">
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {section.items.map((n) => (
                  <li key={n.id}>
                    <NotificationItem notification={n} />
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
