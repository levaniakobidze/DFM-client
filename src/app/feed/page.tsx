"use client";

import { useState } from "react";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import DareCard from "@/components/dare/DareCard";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import { mockDares, DareCategory } from "@/lib/mock-data";

const categories: (DareCategory | "All")[] = ["All", "Fun", "Social", "Creative", "Video", "Public"];

export default function FeedPage() {
  const [active, setActive] = useState<DareCategory | "All">("All");

  const filtered =
    active === "All" ? mockDares : mockDares.filter((d) => d.category === active);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between mb-6">
        <SectionTitle
          title="Browse Dares"
          subtitle={`${filtered.length} challenge${filtered.length !== 1 ? "s" : ""} available`}
        />
        <Link href="/create">
          <Button size="sm">+ Create Dare</Button>
        </Link>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-8">
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

      {filtered.length === 0 ? (
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
          {filtered.map((dare) => (
            <DareCard key={dare.id} dare={dare} />
          ))}
        </div>
      )}
    </div>
  );
}
