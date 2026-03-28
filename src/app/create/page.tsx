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
import { ApiValidationError } from "@/lib/api";
import { interpolate } from "@/lib/notification-i18n";
import { createCheckout } from "@/services/payment.service";

const categories: DareCategory[] = ["Fun", "Social", "Creative", "Video", "Public"];

/** Maps express-validator `path` to form field keys used in this page */
const API_PATH_TO_FORM: Record<string, string> = {
  title: "title",
  description: "description",
  rewardAmount: "reward",
  proofType: "proofRequirement",
  category: "category",
  creatorId: "creatorId",
};

function mapApiFieldErrors(api: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [path, msg] of Object.entries(api)) {
    const key = API_PATH_TO_FORM[path] ?? path;
    out[key] = msg;
  }
  return out;
}

const inputClass =
  "w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500";

function fieldRing(err?: string) {
  return err ? " ring-2 ring-red-500/80 border-red-500 dark:border-red-500" : "";
}

function CreateDareForm() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { mutate: createDare, isPending } = useCreateDare();
  const [selectedCategory, setSelectedCategory] = useState<DareCategory | "">("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [pendingPayment, setPendingPayment] = useState<{
    dareId: string;
    amount: number;
    title: string;
  } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  function clearFieldError(key: string) {
    setFieldErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  const categoryLabels: Record<DareCategory, string> = {
    Fun: t.landing.categoryLabels.Fun,
    Social: t.landing.categoryLabels.Social,
    Creative: t.landing.categoryLabels.Creative,
    Video: t.landing.categoryLabels.Video,
    Public: t.landing.categoryLabels.Public,
  };

  async function handlePayNow() {
    if (!pendingPayment) return;
    setIsCheckingOut(true);
    try {
      const returnUrl = `${window.location.origin}/feed/${pendingPayment.dareId}`;
      const { checkoutUrl } = await createCheckout(pendingPayment.dareId, pendingPayment.amount, returnUrl);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        showToast(t.createDare.checkoutOpenFailed, "error");
        setIsCheckingOut(false);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : t.createDare.checkoutFailed;
      showToast(msg, "error");
      setIsCheckingOut(false);
    }
  }

  if (pendingPayment) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.createDare.fundingTitle}</h2>
          <p className="text-gray-500 dark:text-gray-400">{t.createDare.fundingSubtitle}</p>
        </div>

        <Card className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-400 tracking-wide mb-1">{t.createDare.labelYourDare}</p>
              <p className="font-semibold text-gray-900 dark:text-white truncate">{pendingPayment.title}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs font-semibold text-gray-400 tracking-wide mb-1">{t.createDare.labelReward}</p>
              <p className="text-2xl font-bold text-amber-500">${pendingPayment.amount.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <p>✓ {t.createDare.fundingBullet1}</p>
            <p>✓ {t.createDare.fundingBullet2}</p>
          </div>
        </Card>

        <Button size="lg" className="w-full" onClick={handlePayNow} disabled={isCheckingOut}>
          {isCheckingOut
            ? t.createDare.redirectingToPayment
            : interpolate(t.createDare.payToFund, {
                amount: `$${pendingPayment.amount.toFixed(2)}`,
              })}
        </Button>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-3">
          {t.createDare.secureCheckoutPaddle}
        </p>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});
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
        onSuccess: (dare) => {
          setPendingPayment({ dareId: dare.id, amount: dare.reward, title: dare.title });
        },
        onError: (error) => {
          if (error instanceof ApiValidationError) {
            setFieldErrors(mapApiFieldErrors(error.fieldErrors));
            showToast(error.message, "error");
            return;
          }
          const message =
            error instanceof Error && error.message.trim() ? error.message : t.createDare.postFailed;
          showToast(message, "error");
        },
      }
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <SectionTitle title={t.createDare.title} subtitle={t.createDare.subtitle} className="mb-8" />

      <form onSubmit={handleSubmit} className="space-y-5">
        {fieldErrors.creatorId && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
            {fieldErrors.creatorId}
          </div>
        )}

        {/* Basic info */}
        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t.createDare.basicInfo}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.createDare.titleLabel}</label>
              <input
                name="title"
                type="text"
                required
                placeholder={t.createDare.titlePlaceholder}
                className={`${inputClass}${fieldRing(fieldErrors.title)}`}
                onInput={() => clearFieldError("title")}
              />
              {fieldErrors.title && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{fieldErrors.title}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.createDare.descLabel}</label>
              <textarea
                name="description"
                required
                rows={3}
                placeholder={t.createDare.descPlaceholder}
                className={`${inputClass} resize-none${fieldRing(fieldErrors.description)}`}
                onInput={() => clearFieldError("description")}
              />
              {fieldErrors.description && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{fieldErrors.description}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Category */}
        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t.createDare.category}</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  clearFieldError("category");
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  selectedCategory === cat
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:border-violet-400 hover:text-violet-600"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
          {fieldErrors.category && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{fieldErrors.category}</p>
          )}
        </Card>

        {/* Reward */}
        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t.createDare.rewardAmount}</h3>
          <div className="relative max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">$</span>
            <input
              name="reward"
              type="number"
              required
              min="1"
              placeholder="0.00"
              className={`${inputClass} pl-7${fieldRing(fieldErrors.reward)}`}
              onInput={() => clearFieldError("reward")}
            />
          </div>
          {fieldErrors.reward && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{fieldErrors.reward}</p>
          )}
        </Card>

        {/* Proof requirement */}
        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t.createDare.proofReq}</h3>
          <textarea
            name="proofRequirement"
            required
            rows={2}
            placeholder={t.createDare.proofPlaceholder}
            className={`${inputClass} resize-none${fieldRing(fieldErrors.proofRequirement)}`}
            onInput={() => clearFieldError("proofRequirement")}
          />
          {fieldErrors.proofRequirement && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{fieldErrors.proofRequirement}</p>
          )}
        </Card>

        <Button type="submit" size="lg" className="w-full" disabled={isPending}>
          {isPending ? t.createDare.submitting : t.createDare.continueToPayment}
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
