"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { useCreateDare } from "@/hooks/useCreateDare";
import { useToast } from "@/context/ToastContext";
import { DareCategory } from "@/lib/mock-data";
import { useLanguage } from "@/context/LanguageContext";

const categories: DareCategory[] = ["Fun", "Social", "Creative", "Video", "Public"];

function CreateDareForm() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { mutate: createDare, isPending } = useCreateDare();
  const [selectedCategory, setSelectedCategory] = useState<DareCategory | "">("");
  const [submitted, setSubmitted] = useState(false);

  const categoryLabels: Record<DareCategory, string> = {
    Fun: t.landing.categoryLabels.Fun,
    Social: t.landing.categoryLabels.Social,
    Creative: t.landing.categoryLabels.Creative,
    Video: t.landing.categoryLabels.Video,
    Public: t.landing.categoryLabels.Public,
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.createDare.successTitle}</h2>
        <p className="text-gray-500 mb-6">{t.createDare.successText}</p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => setSubmitted(false)}>{t.createDare.postAnother}</Button>
          <Link href="/feed"><Button>{t.createDare.browseFeed}</Button></Link>
        </div>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedCategory) {
      showToast(t.createDare.categoryError, "error");
      return;
    }
    const form = e.currentTarget;
    const data = new FormData(form);

    createDare(
      {
        title: data.get("title") as string,
        description: data.get("description") as string,
        category: selectedCategory,
        reward: Number(data.get("reward")),
        proofRequirement: data.get("proofRequirement") as string,
      },
      {
        onSuccess: () => {
          showToast(t.createDare.successTitle);
          setSubmitted(true);
        },
        onError: () => showToast(t.feed.errorTitle, "error"),
      }
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <SectionTitle title={t.createDare.title} subtitle={t.createDare.subtitle} className="mb-8" />

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Basic info */}
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">{t.createDare.basicInfo}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.createDare.titleLabel}</label>
              <input
                name="title"
                type="text"
                required
                placeholder={t.createDare.titlePlaceholder}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.createDare.descLabel}</label>
              <textarea
                name="description"
                required
                rows={3}
                placeholder={t.createDare.descPlaceholder}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              />
            </div>
          </div>
        </Card>

        {/* Category */}
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">{t.createDare.category}</h3>
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
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </Card>

        {/* Reward */}
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">{t.createDare.rewardAmount}</h3>
          <div className="relative max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
            <input
              name="reward"
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
          <h3 className="font-semibold text-gray-900 mb-4">{t.createDare.proofReq}</h3>
          <textarea
            name="proofRequirement"
            required
            rows={2}
            placeholder={t.createDare.proofPlaceholder}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
          />
        </Card>

        <Button type="submit" size="lg" className="w-full" disabled={isPending}>
          {isPending ? t.createDare.submitting : t.createDare.submit}
        </Button>
      </form>
    </div>
  );
}

export default function CreateDarePage() {
  return (
    <ProtectedRoute>
      <CreateDareForm />
    </ProtectedRoute>
  );
}
