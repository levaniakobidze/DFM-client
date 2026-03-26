"use client";

import { use } from "react";
import Link from "next/link";
import { useDare } from "@/hooks/useDare";
import { useLanguage } from "@/context/LanguageContext";
import { useAuthStore } from "@/store/useAuthStore";
import { useInteractionStore } from "@/store/useInteractionStore";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { CardSkeleton } from "@/components/ui/Skeleton";
import DareInteractions from "@/components/dare/DareInteractions";
import CommentSection from "@/components/dare/CommentSection";

interface Props {
  params: Promise<{ id: string }>;
}

export default function DareDetailsPage({ params }: Props) {
  const { id } = use(params);
  const { t } = useLanguage();
  const { isLoggedIn } = useAuthStore();
  const { acceptDare } = useInteractionStore();
  const { data: dare, isLoading } = useDare(id);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (!dare) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">{t.dareDetails.notFound}</p>
        <Link href="/feed" className="text-sm text-violet-600 hover:underline mt-2 inline-block">
          {t.dareDetails.backLink}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link
        href="/feed"
        className="text-sm text-gray-500 hover:text-gray-700 transition-colors mb-6 inline-block"
      >
        {t.dareDetails.backToFeed}
      </Link>

      {/* Main info */}
      <Card className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="category">{dare.category}</Badge>
          <span className="text-2xl font-bold text-amber-500">${dare.reward.toFixed(2)}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{dare.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{dare.description}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">{t.dareDetails.postedBy} {dare.createdBy}</p>
      </Card>

      {/* Proof requirement */}
      <Card className="mb-4">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-2">{t.dareDetails.proofRequired}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">{dare.proofRequirement}</p>
      </Card>

      {/* Interactions: like, bookmark, share, report */}
      <DareInteractions dareId={dare.id} />

      {/* Action */}
      <Card className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{t.dareDetails.readyTitle}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t.dareDetails.earn} <span className="text-amber-500 font-semibold">${dare.reward.toFixed(2)}</span> {t.dareDetails.onCompletion}
            </p>
          </div>
          {isLoggedIn ? (
            <Link href={`/submit/${dare.id}`} onClick={() => acceptDare(dare.id)}>
              <Button size="lg">{t.dareDetails.acceptDare}</Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button size="lg">{t.dareDetails.acceptDare}</Button>
            </Link>
          )}
        </div>
        {!isLoggedIn && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-right">
            <Link href="/login" className="text-violet-600 hover:underline font-medium">{t.nav.signIn}</Link>
            {" "}{t.protected.desc.toLowerCase()}
          </p>
        )}
      </Card>

      {/* Comments */}
      <CommentSection dareId={dare.id} />
    </div>
  );
}
