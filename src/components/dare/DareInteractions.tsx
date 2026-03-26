"use client";

import { useState } from "react";
import { useInteractionStore } from "@/store/useInteractionStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/context/ToastContext";
import Card from "@/components/ui/Card";
import ReportModal from "@/components/moderation/ReportModal";

interface Props {
  dareId: string;
}

export default function DareInteractions({ dareId }: Props) {
  const { t } = useLanguage();
  const { isLoggedIn } = useAuthStore();
  const { likes, liked, bookmarks, reported, toggleLike, toggleBookmark, reportDare } =
    useInteractionStore();
  const { showToast } = useToast();
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const likeCount = likes[dareId] ?? 0;
  const isLiked = !!liked[dareId];
  const isBookmarked = !!bookmarks[dareId];
  const isReported = !!reported[dareId];

  const handleLike = () => {
    if (!isLoggedIn) {
      showToast(`${t.nav.signIn} ${t.interactions.loginToInteract}`, "error");
      return;
    }
    toggleLike(dareId);
  };

  const handleBookmark = () => {
    if (!isLoggedIn) {
      showToast(`${t.nav.signIn} ${t.interactions.loginToInteract}`, "error");
      return;
    }
    const willBookmark = !isBookmarked;
    toggleBookmark(dareId);
    showToast(willBookmark ? t.interactions.bookmarked : t.interactions.bookmark, "success");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast(t.interactions.linkCopied, "success");
    });
  };

  const handleReportSubmit = (reason: string, details: string) => {
    void reason; void details;
    reportDare(dareId);
    setReportModalOpen(false);
    showToast(t.interactions.reportDone, "success");
  };

  return (
    <>
      <Card className="mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Like */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isLiked
                ? "bg-rose-50 dark:bg-rose-900/30 text-rose-500 border border-rose-200 dark:border-rose-700"
                : "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-500 hover:border-rose-200 dark:hover:border-rose-700"
            }`}
          >
            <span>{isLiked ? "❤️" : "🤍"}</span>
            <span>{isLiked ? t.interactions.liked : t.interactions.like}</span>
            <span className="font-semibold">{likeCount}</span>
          </button>

          {/* Bookmark */}
          <button
            onClick={handleBookmark}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isBookmarked
                ? "bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-700"
                : "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-600 hover:border-violet-200"
            }`}
          >
            <span>🔖</span>
            <span>{isBookmarked ? t.interactions.bookmarked : t.interactions.bookmark}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 hover:border-blue-200 transition-colors"
          >
            <span>🔗</span>
            <span>{t.interactions.share}</span>
          </button>

          {/* Report */}
          <button
            onClick={() => !isReported && setReportModalOpen(true)}
            disabled={isReported}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ml-auto ${
              isReported
                ? "bg-gray-50 dark:bg-gray-800 text-gray-400 border border-gray-200 dark:border-gray-600 cursor-not-allowed"
                : "bg-gray-50 dark:bg-gray-800 text-gray-400 border border-gray-200 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 hover:border-red-200"
            }`}
          >
            <span>🚩</span>
            <span>{isReported ? t.interactions.alreadyReported : t.interactions.report}</span>
          </button>
        </div>
      </Card>

      <ReportModal
        open={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onSubmit={handleReportSubmit}
      />
    </>
  );
}
