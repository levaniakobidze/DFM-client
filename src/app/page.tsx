"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import { mockDares } from "@/lib/mock-data";
import { useLanguage } from "@/context/LanguageContext";

const categoryKeys = ["Fun", "Social", "Creative", "Video", "Public"] as const;
const categoryIcons: Record<string, string> = {
  Fun: "😄", Social: "🤝", Creative: "🎨", Video: "🎥", Public: "🌍",
};

export default function LandingPage() {
  const { t } = useLanguage();
  const featured = mockDares.slice(0, 3);
  const heroDares = mockDares.slice(0, 4);
  const totalRewards = mockDares.reduce((sum, dare) => sum + dare.reward, 0);
  const stats = [
    { label: t.feed.available, value: mockDares.length.toString() },
    { label: t.wallet.availableBalance, value: `$${totalRewards}` },
    { label: t.nav.createDare, value: "24/7" },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative border-b border-gray-100 dark:border-gray-800 bg-linear-to-b from-violet-50/80 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-lg h-128 rounded-full bg-violet-400/20 blur-3xl"
            animate={{ y: [0, -14, 0], opacity: [0.45, 0.85, 0.45] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-20 right-0 w-72 h-72 rounded-full bg-fuchsia-400/20 blur-3xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-24 left-0 w-72 h-72 rounded-full bg-blue-400/20 blur-3xl"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 bg-white/80 dark:bg-gray-900/70 backdrop-blur border border-violet-200/70 dark:border-violet-700/60 text-violet-700 dark:text-violet-300 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full mb-6 shadow-sm">
                {t.landing.badge}
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-[1.08]">
                {t.landing.headline1}
                <br />
                <motion.span
                  className="bg-linear-to-r from-violet-600 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  style={{ backgroundSize: "220% 220%" }}
                >
                  {t.landing.headline2}
                </motion.span>{" "}
                {t.landing.headline3}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl lg:max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                {t.landing.subtext}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link href="/feed">
                  <Button size="lg" className="px-8 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40">
                    {t.landing.browseDares}
                  </Button>
                </Link>
                <Link href="/create">
                  <Button size="lg" variant="outline" className="px-8 bg-white/70 dark:bg-gray-900/40 backdrop-blur">
                    {t.landing.postDare}
                  </Button>
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap gap-2 justify-center lg:justify-start">
                {categoryKeys.slice(0, 4).map((key) => (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200/80 dark:border-gray-700/80 bg-white/80 dark:bg-gray-900/70 px-3 py-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300"
                  >
                    <span>{categoryIcons[key]}</span>
                    {t.landing.categoryLabels[key]}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 bg-linear-to-r from-violet-500/25 via-fuchsia-500/20 to-blue-500/25 blur-xl rounded-3xl" />
              <motion.div
                className="relative rounded-3xl border border-gray-200/70 dark:border-gray-700/70 bg-white/85 dark:bg-gray-900/80 backdrop-blur p-5 sm:p-6"
                animate={{
                  boxShadow: [
                    "0 12px 30px rgba(0, 0, 0, 0.12)",
                    "0 18px 40px rgba(124, 58, 237, 0.20)",
                    "0 12px 30px rgba(0, 0, 0, 0.12)",
                  ],
                }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{t.landing.featuredDares}</p>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-1.5">
                    <motion.span
                      className="block w-1.5 h-1.5 rounded-full bg-emerald-500"
                      animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.1, 0.85] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {t.feed.available}
                  </span>
                </div>
                <div className="space-y-3">
                  {heroDares.map((dare, i) => (
                    <motion.div
                      key={dare.id}
                      className="rounded-xl border border-gray-200/80 dark:border-gray-700/80 bg-white/80 dark:bg-gray-950/60 px-4 py-3"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        opacity: { duration: 0.4, delay: i * 0.08 },
                        y: { duration: 0.45, delay: i * 0.08, ease: "easeOut" },
                      }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">{dare.title}</p>
                        <span className="text-xs font-bold text-violet-600 dark:text-violet-400 whitespace-nowrap">${dare.reward}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t.landing.categoryLabels[dare.category]}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-gray-200/80 dark:border-gray-700/80 bg-white/85 dark:bg-gray-900/70 backdrop-blur px-5 py-4 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 capitalize">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative bg-gray-50 dark:bg-gray-950 py-20">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-violet-400/60 to-transparent" />
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <SectionTitle title={t.landing.howItWorks} subtitle={t.landing.howSubtitle} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.landing.steps.map((s, i) => (
              <div
                key={i}
                className="relative group bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-200 dark:border-gray-700 p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10"
              >
                <div className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-violet-400/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-3xl mb-4">{s.icon}</div>
                <div className="w-8 h-8 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center mx-auto mb-3">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured dares */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <SectionTitle title={t.landing.featuredDares} subtitle={t.landing.featuredSubtitle} />
            <div className="flex items-center gap-2">
              {categoryKeys.slice(0, 3).map((key) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 px-3 py-1.5 text-xs text-gray-600 dark:text-gray-300"
                >
                  <span>{categoryIcons[key]}</span>
                  {t.landing.categoryLabels[key]}
                </span>
              ))}
              <Link href="/feed" className="text-sm font-semibold text-violet-600 hover:text-violet-700 dark:hover:text-violet-400 transition-colors whitespace-nowrap">
                {t.landing.viewAll}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featured.map((dare) => (
              <div
                key={dare.id}
                className="group relative rounded-2xl bg-white dark:bg-gray-900 p-6 ring-1 ring-gray-200/80 dark:ring-gray-700 shadow-lg shadow-gray-900/10 dark:shadow-black/35 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/15 transition-all duration-300"
              >
                <div className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-violet-300/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center rounded-full bg-violet-100/80 dark:bg-violet-900/35 text-violet-700 dark:text-violet-300 text-xs font-semibold px-2.5 py-1">
                    {t.landing.categoryLabels[dare.category]}
                  </span>
                  <span className="text-lg font-extrabold text-amber-500">${dare.reward.toFixed(2)}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-14">{dare.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 min-h-18">{dare.description}</p>
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <span className="text-xs text-gray-400 dark:text-gray-500">by {dare.createdBy}</span>
                  <Link href={`/feed/${dare.id}`}>
                    <Button size="sm" className="group-hover:shadow-md group-hover:shadow-violet-500/20">
                        {t.landing.view}
                    </Button>
                  </Link>
                </div>
              </div>
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
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {categoryKeys.map((key) => (
              <Link key={key} href={`/feed?category=${key}`}>
                <span className="inline-flex items-center gap-2 bg-white/85 dark:bg-gray-900/85 backdrop-blur border border-gray-200 dark:border-gray-700 rounded-full px-5 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:-translate-y-0.5 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all cursor-pointer">
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
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden border border-violet-200/60 dark:border-violet-700/40 bg-linear-to-r from-violet-600 via-fuchsia-600 to-blue-600 p-px shadow-2xl shadow-violet-500/20">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur rounded-[calc(1.5rem-1px)] px-6 sm:px-10 py-14 text-center">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{t.landing.ctaTitle}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-10 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">{t.landing.ctaSubtext}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/feed">
                  <Button size="lg" className="px-8 shadow-lg shadow-violet-500/30">
                    {t.landing.browseDares}
                  </Button>
                </Link>
                <Link href="/create">
                  <Button size="lg" variant="outline" className="px-8">
                    {t.landing.postDare}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
