"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ModerationBadge from "@/components/moderation/ModerationBadge";
import { Dare } from "@/lib/mock-data";
import { useLanguage } from "@/context/LanguageContext";
import { useInteractionStore } from "@/store/useInteractionStore";

interface DareCardProps {
  dare: Dare;
}

export default function DareCard({ dare }: DareCardProps) {
  const { t } = useLanguage();
  const { reported } = useInteractionStore();
  const isFlagged = !!reported[dare.id];

  const categoryLabel =
    t.landing.categoryLabels[dare.category as keyof typeof t.landing.categoryLabels] ?? dare.category;

  return (
    <Card hover className="flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="category">{categoryLabel}</Badge>
          {dare.status === "completed" && <Badge variant="success">{t.profile.completed}</Badge>}
          {dare.status === "pending" && <Badge variant="pending">{t.moderation.underReview}</Badge>}
          {dare.status === "expired" && <Badge variant="danger">{t.admin.statusExpired}</Badge>}
          {isFlagged && <ModerationBadge status="flagged" />}
        </div>
        <span className="text-xl font-extrabold text-amber-500 leading-none shrink-0">${dare.reward.toFixed(2)}</span>
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug">{dare.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 line-clamp-2 flex-1 leading-relaxed">{dare.description}</p>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
        <span className="text-xs text-gray-400 dark:text-gray-500">by {dare.createdBy}</span>
        <Link href={`/feed/${dare.id}`}>
          <Button size="sm" variant={dare.status === "completed" ? "outline" : "primary"}>
            {dare.status === "completed" ? t.feed.viewProof : t.landing.view}
          </Button>
        </Link>
      </div>
    </Card>
  );
}
