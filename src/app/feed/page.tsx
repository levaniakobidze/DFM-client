"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import DareCard from "@/components/dare/DareCard";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { mockDares, DareCategory, Dare } from "@/lib/mock-data";

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
  const [active, setActive] = useState<DareCategory | "All">("All");
  const [sort, setSort] = useState<SortOption>("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = active === "All" ? mockDares : mockDares.filter((d) => d.category === active);
  const sorted = sortDares(filtered, sort);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Header row */}
      <div className="flex items-end justify-between mb-6">
        <SectionTitle
          title="Browse Dares"
          subtitle={`${filtered.length} challenge${filtered.length !== 1 ? "s" : ""} available`}
        />
        <Link href="/create">
          <Button size="sm">+ Create Dare</Button>
        </Link>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        {/* Category chips */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                active === cat
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-violet-400 hover:text-violet-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 shrink-0"
        >
          <option value="newest">Newest</option>
          <option value="reward-high">Highest Reward</option>
          <option value="reward-low">Lowest Reward</option>
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <EmptyState
          title="No dares in this category"
          description="Be the first to post a dare here."
          action={
            <Link href="/create">
              <Button>Create a Dare</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sorted.map((dare) => (
            <DareCard key={dare.id} dare={dare} />
          ))}
        </div>
      )}
    </div>
  );
}
