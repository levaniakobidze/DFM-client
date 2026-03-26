"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string, details: string) => void;
}

export default function ReportModal({ open, onClose, onSubmit }: Props) {
  const { t } = useLanguage();
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Reset form when closed
  useEffect(() => {
    if (!open) {
      setReason("");
      setDetails("");
    }
  }, [open]);

  // Escape key to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const reasons = [
    { key: "dangerous",    label: t.moderation.reasonDangerous     },
    { key: "inappropriate", label: t.moderation.reasonInappropriate },
    { key: "privacy",      label: t.moderation.reasonPrivacy        },
    { key: "spam",         label: t.moderation.reasonSpam           },
    { key: "other",        label: t.moderation.reasonOther          },
  ];

  const handleSubmit = () => {
    if (!reason) return;
    onSubmit(reason, details);
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-sm">🚩</span>
              <h2 className="font-bold text-gray-900 dark:text-white text-base">{t.moderation.reportModalTitle}</h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 ml-9">{t.moderation.reportModalSubtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Reason selection */}
          <div>
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
              {t.moderation.reasonLabel}
            </p>
            <div className="space-y-2">
              {reasons.map(({ key, label }) => (
                <label
                  key={key}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    reason === key
                      ? "border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-700 hover:bg-red-50/50 dark:hover:bg-red-900/10"
                  }`}
                >
                  <input
                    type="radio"
                    name="report-reason"
                    value={key}
                    checked={reason === key}
                    onChange={() => setReason(key)}
                    className="accent-red-500 shrink-0"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Details textarea */}
          <div>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={t.moderation.descriptionPlaceholder}
              rows={3}
              className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400/40 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              {t.interactions.reportCancel}
            </Button>
            <button
              onClick={handleSubmit}
              disabled={!reason}
              className="flex-1 py-2 px-4 rounded-xl text-sm font-semibold bg-red-500 hover:bg-red-600 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t.interactions.reportSubmit}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
