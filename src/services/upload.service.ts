import { api } from "@/lib/api";

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/quicktime",
] as const;

export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number];

const IMAGE_MIME_TYPES: string[] = ["image/jpeg", "image/png", "image/webp"];

export const MAX_IMAGE_SIZE_BYTES = 20 * 1024 * 1024;   // 20 MB
export const MAX_VIDEO_SIZE_BYTES = 500 * 1024 * 1024;  // 500 MB
export const MAX_FILE_SIZE_BYTES = MAX_VIDEO_SIZE_BYTES;

interface SignedUrlResponse {
  signedUrl: string;
  path: string;
  publicUrl: string;
  expiresInSeconds: number;
}

/**
 * Step 1 — ask the server for a signed upload URL.
 * Validates ownership on the server side.
 */
export async function requestProofUploadUrl(params: {
  acceptanceId: string;
  filename: string;
  mimeType: string;
  size: number;
}): Promise<SignedUrlResponse> {
  return api.post<SignedUrlResponse>("/uploads/proof-url", params);
}

/**
 * Step 2 — PUT the file directly to Supabase Storage using the signed URL.
 * Returns the public URL of the uploaded file.
 */
export async function uploadFileToStorage(
  signedUrl: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", signedUrl);
    xhr.setRequestHeader("Content-Type", file.type);

    if (onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error("Upload network error"));
    xhr.send(file);
  });
}

/** Validate a file before uploading — returns an error message or null. */
export function validateProofFile(file: File): string | null {
  if (!ALLOWED_MIME_TYPES.includes(file.type as AllowedMimeType)) {
    return "Only JPEG, PNG, WebP images and MP4/MOV videos are allowed.";
  }
  const isImage = IMAGE_MIME_TYPES.includes(file.type);
  const limit = isImage ? MAX_IMAGE_SIZE_BYTES : MAX_VIDEO_SIZE_BYTES;
  if (file.size > limit) {
    return `${isImage ? "Images" : "Videos"} must be under ${limit / (1024 * 1024)} MB.`;
  }
  return null;
}
