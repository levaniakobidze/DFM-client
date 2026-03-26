"use client";

import { use, useState } from "react";
import Link from "next/link";
import { mockDares } from "@/lib/mock-data";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import { useToast } from "@/context/ToastContext";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  params: Promise<{ id: string }>;
}

const inputClass = "w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500";

export default function SubmitPage({ params }: Props) {
  const { id } = use(params);
  const { t } = useLanguage();
  const { showToast } = useToast();
  const dare = mockDares.find((d) => d.id === id);
  const [submitted, setSubmitted] = useState(false);

  if (!dare) return null;

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-2xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-4xl mx-auto mb-6">
          ⏳
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3">{t.submit.successTitle}</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">{t.submit.successText}</p>
        <p className="text-sm text-violet-600 font-medium mb-8">
          {t.submit.potentialReward} <span className="text-amber-500 font-bold">${dare.reward.toFixed(2)}</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/feed"><Button variant="outline">{t.submit.backToFeed}</Button></Link>
          <Link href="/profile"><Button>{t.submit.viewActivity}</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-5">
      <Link
        href={`/feed/${dare.id}`}
        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors inline-block"
      >
        {t.submit.backToDare}
      </Link>

      <SectionTitle title={t.submit.title} subtitle={t.submit.subtitle} />

      {/* Dare summary */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="category">{dare.category}</Badge>
          <span className="font-bold text-amber-500">${dare.reward.toFixed(2)}</span>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{dare.title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{dare.proofRequirement}</p>
      </Card>

      {/* Upload form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          showToast(t.submit.successTitle, "info");
          setSubmitted(true);
        }}
        className="space-y-4"
      >
        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{t.submit.uploadFile}</h3>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl py-10 cursor-pointer hover:border-violet-400 dark:hover:border-violet-500 transition-colors">
            <span className="text-3xl mb-2">📁</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.submit.uploadText}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">{t.submit.uploadSubtext}</span>
            <input type="file" className="hidden" accept="image/*,video/*" />
          </label>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{t.submit.notes}</h3>
          <textarea rows={3} placeholder={t.submit.notesPlaceholder} className={`${inputClass} resize-none`} />
        </Card>

        <Button type="submit" size="lg" className="w-full">{t.submit.submit}</Button>
      </form>
    </div>
  );
}
