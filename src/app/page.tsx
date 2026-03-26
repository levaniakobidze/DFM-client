"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import DareCard from "@/components/dare/DareCard";
import { mockDares } from "@/lib/mock-data";
import { useLanguage } from "@/context/LanguageContext";

const categoryKeys = ["Fun", "Social", "Creative", "Video", "Public"] as const;
const categoryIcons: Record<string, string> = {
  Fun: "😄", Social: "🤝", Creative: "🎨", Video: "🎥", Public: "🌍",
};

export default function LandingPage() {
  const { t } = useLanguage();
  const featured = mockDares.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-24 text-center">
          <span className="inline-flex items-center gap-1.5 bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-violet-200 dark:border-violet-700 mb-6">
            {t.landing.badge}
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight tracking-tight">
            {t.landing.headline1}<br />
            <span className="text-violet-600">{t.landing.headline2}</span>{" "}
            {t.landing.headline3}
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            {t.landing.subtext}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/feed"><Button size="lg" className="px-8">{t.landing.browseDares}</Button></Link>
            <Link href="/create"><Button size="lg" variant="outline" className="px-8">{t.landing.postDare}</Button></Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 dark:bg-gray-950 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <SectionTitle title={t.landing.howItWorks} subtitle={t.landing.howSubtitle} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.landing.steps.map((s, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-7 text-center">
                <div className="text-3xl mb-4">{s.icon}</div>
                <div className="w-7 h-7 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center mx-auto mb-3">
                  {i + 1}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured dares */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <SectionTitle title={t.landing.featuredDares} subtitle={t.landing.featuredSubtitle} />
            <Link href="/feed" className="text-sm font-semibold text-violet-600 hover:text-violet-700 dark:hover:text-violet-400 transition-colors">
              {t.landing.viewAll}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {featured.map((dare) => (
              <DareCard key={dare.id} dare={dare} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 dark:bg-gray-950 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-10">
            <SectionTitle title={t.landing.categories} subtitle={t.landing.categoriesSubtitle} />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categoryKeys.map((key) => (
              <Link key={key} href={`/feed?category=${key}`}>
                <span className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all cursor-pointer">
                  <span>{categoryIcons[key]}</span>
                  {t.landing.categoryLabels[key]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">{t.landing.ctaTitle}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg leading-relaxed">{t.landing.ctaSubtext}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/feed"><Button size="lg" className="px-8">{t.landing.browseDares}</Button></Link>
            <Link href="/create"><Button size="lg" variant="outline" className="px-8">{t.landing.postDare}</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
