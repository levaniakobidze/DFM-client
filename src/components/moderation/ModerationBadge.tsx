import { useLanguage } from "@/context/LanguageContext";

export type ModerationStatus = "pending" | "approved" | "rejected" | "flagged";

interface Props {
  status: ModerationStatus;
  size?: "sm" | "md";
}

const config: Record<ModerationStatus, { icon: string; classes: string }> = {
  pending:  { icon: "⏳", classes: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400" },
  approved: { icon: "✅", classes: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400" },
  rejected: { icon: "❌", classes: "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400"         },
  flagged:  { icon: "🚩", classes: "bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400" },
};

export default function ModerationBadge({ status, size = "sm" }: Props) {
  const { t } = useLanguage();

  const labels: Record<ModerationStatus, string> = {
    pending:  t.moderation.statusPending,
    approved: t.moderation.statusApproved,
    rejected: t.moderation.statusRejected,
    flagged:  t.moderation.statusFlagged,
  };

  const { icon, classes } = config[status];
  const padding = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold ${padding} ${classes}`}>
      <span className="text-[11px]">{icon}</span>
      {labels[status]}
    </span>
  );
}
