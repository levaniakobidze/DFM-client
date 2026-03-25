"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";

const categories = ["Fun", "Social", "Creative", "Video", "Public"];

export default function CreateDarePage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dare Posted!</h2>
        <p className="text-gray-500 mb-6">Your dare is now live and waiting for takers.</p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => setSubmitted(false)}>Post Another</Button>
          <Link href="/feed"><Button>Browse Feed</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <SectionTitle
        title="Create a Dare"
        subtitle="Post a challenge and set your reward."
        className="mb-8"
      />

      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">

        {/* Basic info */}
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Basic Info</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Eat a spoonful of hot sauce"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                required
                rows={3}
                placeholder="Describe the dare in detail..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              />
            </div>
          </div>
        </Card>

        {/* Category */}
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  selectedCategory === cat
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-violet-400 hover:text-violet-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Card>

        {/* Reward */}
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Reward Amount</h3>
          <div className="relative max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
            <input
              type="number"
              required
              min="1"
              placeholder="0.00"
              className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </Card>

        {/* Proof requirement */}
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Proof Requirement</h3>
          <textarea
            required
            rows={2}
            placeholder="e.g. Upload a video showing you completing the dare from start to finish."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
          />
        </Card>

        <Button type="submit" size="lg" className="w-full">Post Dare</Button>
      </form>
    </div>
  );
}
