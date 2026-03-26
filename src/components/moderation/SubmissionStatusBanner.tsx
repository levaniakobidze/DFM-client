"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { SubmissionStatus } from "@/store/useInteractionStore";

interface Props {
  status: SubmissionStatus;
  dareId: string;
}

const statusConfig = {
  pending: {
    icon: "⏳",
    bg:    "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700",
    title: (t: ReturnType<typeof useLanguage>["t"]) => t.moderation.submissionPending,
    desc:  (t: ReturnType<typeof useLanguage>["t"]) => t.moderation.submissionPendingDesc,
    dot:   "bg-amber-400",
  },
  approved: {
    icon: "🎉",
    bg:    "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700",
    title: (t: ReturnType<typeof useLanguage>["t"]) => t.moderation.submissionApproved,
    desc:  (t: ReturnType<typeof useLanguage>["t"]) => t.moderation.submissionApprovedDesc,
    dot:   "bg-green-400",
  },
  rejected: {
    icon: "😔",
    bg:    "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700",
    title: (t: ReturnType<typeof useLanguage>["t"]) => t.moderation.submissionRejected,
    desc:  (t: ReturnType<typeof useLanguage>["t"]) => t.moderation.submissionRejectedDesc,
    dot:   "bg-red-400",
  },
};

export default function SubmissionStatusBanner({ status, dareId }: Props) {
  const { t } = useLanguage();
  const cfg = statusConfig[status];

  return (
    <div className={`rounded-2xl border p-4 mb-4 ${cfg.bg}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0 mt-0.5">{cfg.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{cfg.title(t)}</p>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{cfg.desc(t)}</p>
          {status === "approved" && (
            <Link href="/wallet" className="inline-block mt-2 text-xs font-semibold text-green-700 dark:text-green-400 hover:underline">
              {t.moderation.viewWallet} →
            </Link>
          )}
          {status === "rejected" && (
            <Link href={`/submit/${dareId}`} className="inline-block mt-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:underline">
              {t.moderation.tryAgain} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
