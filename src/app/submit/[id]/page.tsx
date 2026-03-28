"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { useToast } from "@/context/ToastContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAuthStore } from "@/store/useAuthStore";
import { useDare } from "@/hooks/useDare";
import { useCreateSubmission } from "@/hooks/useCreateSubmission";
import { useMyAcceptances } from "@/hooks/useProfile";
import { CardSkeleton } from "@/components/ui/Skeleton";
import {
  requestProofUploadUrl,
  uploadFileToStorage,
  validateProofFile,
} from "@/services/upload.service";

interface Props {
  params: Promise<{ id: string }>;
}

const inputClass =
  "w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500";

function SubmitForm({ dareId }: { dareId: string }) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const { user } = useAuthStore();
  const { data: dare, isLoading: isDareLoading } = useDare(dareId);
  const { data: acceptancesData, isLoading: isAcceptanceLoading } = useMyAcceptances({ dareId });
  const { mutate: createSubmission, isPending: isCreating } = useCreateSubmission();

  const [submitted, setSubmitted] = useState(false);
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  /** Blob/object URL for local preview — not compatible with next/image data URLs */
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewKind, setPreviewKind] = useState<"image" | "video" | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const acceptance = acceptancesData?.acceptances?.[0];
  const acceptanceId = acceptance?.id;
  const isLoading = isDareLoading || isAcceptanceLoading;
  const isPending = isUploading || isCreating;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const error = validateProofFile(selected);
    if (error) {
      showToast(error, "error");
      return;
    }

    setFile(selected);

    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(selected);
    });
    setPreviewKind(selected.type.startsWith("video/") ? "video" : "image");
  }

  function removeFile() {
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setPreviewKind(null);
    setFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user) {
      showToast("You must be signed in to submit.", "error");
      return;
    }

    if (!acceptanceId) {
      showToast("Go back to the dare and click Accept first.", "error");
      return;
    }

    let proofUrl: string | undefined;
    let proofType: string | undefined;

    if (file) {
      try {
        setIsUploading(true);
        setUploadProgress(0);

        const { signedUrl, publicUrl } = await requestProofUploadUrl({
          acceptanceId,
          filename: file.name,
          mimeType: file.type,
          size: file.size,
        });

        await uploadFileToStorage(signedUrl, file, setUploadProgress);

        proofUrl = publicUrl;
        proofType = file.type.startsWith("video/") ? "VIDEO" : "PHOTO";
      } catch (err) {
        const msg = err instanceof Error ? err.message : "File upload failed";
        showToast(msg, "error");
        return;
      } finally {
        setIsUploading(false);
      }
    }

    createSubmission(
      { acceptanceId, userId: user.id, note: note || undefined, proofUrl, proofType },
      {
        onSuccess: () => {
          setSubmitted(true);
        },
        onError: (err) => {
          const msg = err instanceof Error ? err.message : "Submission failed";
          showToast(msg, "error");
        },
      }
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-10 space-y-5">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

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
        href={`/feed/${dareId}`}
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

      {!acceptanceId && (
        <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
          You need to accept this dare before submitting.{" "}
          <Link href={`/feed/${dareId}`} className="font-semibold underline">Go back and accept it.</Link>
        </div>
      )}

      {/* Upload form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{t.submit.uploadFile}</h3>

          {file && previewUrl && previewKind ? (
            <div className="space-y-3">
              <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                <button
                  type="button"
                  onClick={removeFile}
                  disabled={isPending}
                  className="absolute top-2 right-2 z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-black/55 text-white hover:bg-black/70 disabled:opacity-50 transition-colors"
                  aria-label={t.submit.removeFile}
                  title={t.submit.removeFile}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>

                {previewKind === "image" ? (
                  <div className="w-full aspect-video flex items-center justify-center p-2">
                    <img
                      src={previewUrl}
                      alt=""
                      className="max-h-64 w-auto max-w-full object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="p-2">
                    <video
                      src={previewUrl}
                      controls
                      className="w-full max-h-64 rounded-lg bg-black"
                      preload="metadata"
                    />
                  </div>
                )}

                <div className="px-3 pb-3 pt-0 flex items-center gap-2 min-w-0 border-t border-gray-200/80 dark:border-gray-600/80">
                  <span className="text-lg shrink-0" aria-hidden>{previewKind === "video" ? "🎬" : "🖼️"}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
                  </div>
                </div>
              </div>

              {/* Upload progress */}
              {isUploading && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Uploading…</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-500 transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={removeFile}
                disabled={isPending}
                className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50 sm:hidden"
              >
                {t.submit.removeFile}
              </button>
            </div>
          ) : file ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 p-3">
                <span className="text-2xl">📄</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  disabled={isPending}
                  className="text-red-500 hover:text-red-700 disabled:opacity-50 p-1"
                  aria-label={t.submit.removeFile}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl py-10 cursor-pointer hover:border-violet-400 dark:hover:border-violet-500 transition-colors">
              <span className="text-3xl mb-2">📁</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.submit.uploadText}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">{t.submit.uploadSubtext}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Images up to 20 MB · Videos up to 500 MB</span>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime"
                onChange={handleFileChange}
              />
            </label>
          )}
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{t.submit.notes}</h3>
          <textarea
            rows={3}
            placeholder={t.submit.notesPlaceholder}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </Card>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isPending || !acceptanceId}
        >
          {isUploading
            ? `Uploading… ${uploadProgress}%`
            : isCreating
            ? "Submitting…"
            : t.submit.submit}
        </Button>
      </form>
    </div>
  );
}

export default function SubmitPage({ params }: Props) {
  const { id } = use(params);
  return (
    <ProtectedRoute>
      <SubmitForm dareId={id} />
    </ProtectedRoute>
  );
}
