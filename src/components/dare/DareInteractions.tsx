"use client";

import { useState } from "react";
import { useInteractionStore } from "@/store/useInteractionStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/context/ToastContext";
import Card from "@/components/ui/Card";

interface Props {
  dareId: string;
}

export default function DareInteractions({ dareId }: Props) {
  const { t } = useLanguage();
  const { isLoggedIn } = useAuthStore();
  const { likes, liked, bookmarks, reported, toggleLike, toggleBookmark, reportDare } =
    useInteractionStore();
  const { showToast } = useToast();
  const [showReport, setShowReport] = useState(false);
  const [reportText, setReportText] = useState("");

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

  const handleReport = () => {
    if (!reportText.trim()) return;
    reportDare(dareId);
    setShowReport(false);
    setReportText("");
    showToast(t.interactions.reportDone, "success");
  };

  return (
    <Card className="mb-4">
      <div className="flex items-center gap-2 flex-wrap">
        {/* Like */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            isLiked
              ? "bg-rose-50 text-rose-500 border border-rose-200"
              : "bg-gray-50 text-gray-500 border border-gray-200 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200"
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
              ? "bg-violet-50 text-violet-600 border border-violet-200"
              : "bg-gray-50 text-gray-500 border border-gray-200 hover:bg-violet-50 hover:text-violet-600 hover:border-violet-200"
          }`}
        >
          <span>🔖</span>
          <span>{isBookmarked ? t.interactions.bookmarked : t.interactions.bookmark}</span>
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-50 text-gray-500 border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
        >
          <span>🔗</span>
          <span>{t.interactions.share}</span>
        </button>

        {/* Report */}
        <button
          onClick={() => !isReported && setShowReport((v) => !v)}
          disabled={isReported}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ml-auto ${
            isReported
              ? "bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed"
              : "bg-gray-50 text-gray-400 border border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
          }`}
        >
          <span>🚩</span>
          <span>{isReported ? t.interactions.alreadyReported : t.interactions.report}</span>
        </button>
      </div>

      {/* Inline report form */}
      {showReport && (
        <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl">
          <p className="text-sm font-semibold text-red-700 mb-2">{t.interactions.reportTitle}</p>
          <textarea
            className="w-full text-sm border border-red-200 rounded-lg p-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 resize-none bg-white"
            rows={3}
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            placeholder={t.interactions.reportPlaceholder}
          />
          <div className="flex gap-2 mt-2 justify-end">
            <button
              onClick={() => {
                setShowReport(false);
                setReportText("");
              }}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t.interactions.reportCancel}
            </button>
            <button
              onClick={handleReport}
              disabled={!reportText.trim()}
              className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.interactions.reportSubmit}
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
