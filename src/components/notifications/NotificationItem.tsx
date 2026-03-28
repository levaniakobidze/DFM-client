"use client";

import Link from "next/link";
import type { Notification, NotificationType } from "@/services/notification.service";
import { useMarkRead } from "@/hooks/useNotifications";
import { useLanguage } from "@/context/LanguageContext";
import { localizeNotificationBody, localizeNotificationRelativeTime } from "@/lib/notification-i18n";

const typeConfig: Record<NotificationType, { icon: string; color: string; bg: string; darkBg: string }> = {
  DARE_ACCEPTED:       { icon: "🎯", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-100", darkBg: "dark:bg-violet-900/40" },
  SUBMISSION_APPROVED: { icon: "✅", color: "text-green-600 dark:text-green-400",   bg: "bg-green-100",  darkBg: "dark:bg-green-900/40"  },
  SUBMISSION_REJECTED: { icon: "❌", color: "text-red-500 dark:text-red-400",       bg: "bg-red-100",    darkBg: "dark:bg-red-900/40"    },
  REWARD_RECEIVED:     { icon: "💰", color: "text-amber-500 dark:text-amber-400",   bg: "bg-amber-100",  darkBg: "dark:bg-amber-900/40"  },
  ACCOUNT_PAUSED:      { icon: "⏸",  color: "text-amber-500 dark:text-amber-400",   bg: "bg-amber-100",  darkBg: "dark:bg-amber-900/40"  },
  ACCOUNT_BLOCKED:     { icon: "🚫", color: "text-red-500 dark:text-red-400",       bg: "bg-red-100",    darkBg: "dark:bg-red-900/40"    },
  ACCOUNT_REACTIVATED: { icon: "✨", color: "text-green-600 dark:text-green-400",   bg: "bg-green-100",  darkBg: "dark:bg-green-900/40"  },
};

interface Props {
  notification: Notification;
  onClick?: () => void;
}

export default function NotificationItem({ notification, onClick }: Props) {
  const { t } = useLanguage();
  const markRead = useMarkRead();
  const cfg = typeConfig[notification.type];

  const typeLabel: Record<NotificationType, string> = {
    DARE_ACCEPTED:       t.notifications.dareAccepted,
    SUBMISSION_APPROVED: t.notifications.submissionApproved,
    SUBMISSION_REJECTED: t.notifications.submissionRejected,
    REWARD_RECEIVED:     t.notifications.rewardReceived,
    ACCOUNT_PAUSED:      t.notifications.accountPaused,
    ACCOUNT_BLOCKED:     t.notifications.accountBlocked,
    ACCOUNT_REACTIVATED: t.notifications.accountReactivated,
  };

  const body = localizeNotificationBody(notification.type, notification.message, {
    msgDareAccepted: t.notifications.msgDareAccepted,
    msgSubmissionApproved: t.notifications.msgSubmissionApproved,
    msgRewardReceived: t.notifications.msgRewardReceived,
    msgSubmissionRejected: t.notifications.msgSubmissionRejected,
    msgAccountBlocked: t.notifications.msgAccountBlocked,
    msgAccountPaused: t.notifications.msgAccountPaused,
    msgAccountReactivated: t.notifications.msgAccountReactivated,
  });

  const when = localizeNotificationRelativeTime(notification.createdAt, {
    justNow: t.notifications.timeJustNow,
    minutesAgo: t.notifications.timeMinutesAgo,
    hoursAgo: t.notifications.timeHoursAgo,
    yesterday: t.notifications.timeYesterday,
    daysAgo: t.notifications.timeDaysAgo,
  });

  const handleClick = () => {
    if (!notification.read) markRead.mutate(notification.id);
    onClick?.();
  };

  const content = (
    <div
      className={`flex items-start gap-3 px-4 py-3.5 transition-colors ${
        !notification.read
          ? "bg-violet-50/60 dark:bg-violet-900/10 hover:bg-violet-50 dark:hover:bg-violet-900/20"
          : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
      }`}
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${cfg.bg} ${cfg.darkBg}`}>
        {cfg.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-xs font-semibold ${cfg.color}`}>{typeLabel[notification.type]}</span>
          <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">{when}</span>
        </div>
        <p className={`text-sm mt-0.5 line-clamp-2 leading-snug ${
          !notification.read
            ? "text-gray-900 dark:text-white font-medium"
            : "text-gray-600 dark:text-gray-400"
        }`}>
          {body}
        </p>
      </div>
      {!notification.read && (
        <div className="w-2 h-2 rounded-full bg-violet-500 shrink-0 mt-1.5" />
      )}
    </div>
  );

  if (notification.dareId) {
    return (
      <Link href={`/feed/${notification.dareId}`} onClick={handleClick}>
        {content}
      </Link>
    );
  }

  return <div onClick={handleClick} className="cursor-pointer">{content}</div>;
}
