"use client";

import { useState } from "react";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import DareCard from "@/components/dare/DareCard";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { useDares } from "@/hooks/useDares";
import { DareCategory, Dare } from "@/lib/mock-data";
import { useLanguage } from "@/context/LanguageContext";

const categories: (DareCategory | "All")[] = ["All", "Fun", "Social", "Creative", "Video", "Public"];

type SortOption = "newest" | "reward-high" | "reward-low";

function sortDares(dares: Dare[], sort: SortOption): Dare[] {
  switch (sort) {
    case "reward-high": return [...dares].sort((a, b) => b.reward - a.reward);
    case "reward-low":  return [...dares].sort((a, b) => a.reward - b.reward);
    default:            return dares;
  }
}

export default function FeedPage() {
  const { t } = useLanguage();
  const [active, setActive] = useState<DareCategory | "All">("All");
  const [sort, setSort] = useState<SortOption>("newest");

  const { data = [], isLoading, isError } = useDares(active);
  const sorted = sortDares(data, sort);

  const categoryLabels: Record<string, string> = {
    All: t.feed.all,
    Fun: t.landing.categoryLabels.Fun,
    Social: t.landing.categoryLabels.Social,
    Creative: t.landing.categoryLabels.Creative,
    Video: t.landing.categoryLabels.Video,
    Public: t.landing.categoryLabels.Public,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Header row */}
      <div className="flex items-end justify-between mb-6">
        <SectionTitle
          title={t.feed.title}
          subtitle={isLoading ? t.feed.loading : `${data.length} ${data.length !== 1 ? t.feed.challenges : t.feed.challenge} ${t.feed.available}`}
        />
        <Link href="/create">
          <Button size="sm">{t.feed.createDare}</Button>
        </Link>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all active:scale-95 ${
                active === cat
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500 shrink-0"
        >
          <option value="newest">{t.feed.sortNewest}</option>
          <option value="reward-high">{t.feed.sortHighest}</option>
          <option value="reward-low">{t.feed.sortLowest}</option>
        </select>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : isError ? (
        <EmptyState
          icon="⚠️"
          title={t.feed.errorTitle}
          description={t.feed.errorDesc}
          action={<Button onClick={() => window.location.reload()}>{t.feed.retry}</Button>}
        />
      ) : sorted.length === 0 ? (
        <EmptyState
          title={t.feed.emptyTitle}
          description={t.feed.emptyDesc}
          action={<Link href="/create"><Button>{t.feed.createDare}</Button></Link>}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sorted.map((dare) => <DareCard key={dare.id} dare={dare} />)}
        </div>
      )}
    </div>
  );
}
