import { api } from "@/lib/api";
import { Dare, DareCategory } from "@/lib/mock-data";

// ─── Backend shape ────────────────────────────────────────────────────────────
// What the API actually returns — separate from the frontend Dare type.

interface BackendCreator {
  id: string;
  username: string;
  avatarUrl: string | null;
}

interface BackendDare {
  id: string;
  title: string;
  description: string;
  category: string;
  rewardAmount: string; // Prisma Decimal serialises to string
  proofType: string;
  status: string;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
  creator: BackendCreator;
  _count?: { acceptances: number; submissions?: number };
}

interface BackendFeedResponse {
  dares: BackendDare[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ─── Mappers ──────────────────────────────────────────────────────────────────

const CATEGORY_TO_BACKEND: Record<DareCategory, string> = {
  Fun: "FUNNY",
  Social: "SOCIAL",
  Creative: "CREATIVE",
  Video: "OTHER",   // no VIDEO enum in backend yet
  Public: "SOCIAL",
};

const CATEGORY_FROM_BACKEND: Record<string, DareCategory> = {
  FUNNY: "Fun",
  FITNESS: "Fun",
  CREATIVE: "Creative",
  SOCIAL: "Social",
  FOOD: "Fun",
  OUTDOOR: "Fun",
  CHALLENGE: "Fun",
  OTHER: "Fun",
};

const STATUS_FROM_BACKEND: Record<string, Dare["status"]> = {
  DRAFT: "open",
  ACTIVE: "open",
  CLOSED: "pending",
  COMPLETED: "completed",
  REJECTED: "expired",
  CANCELLED: "expired",
};

const PROOF_TYPE_LABEL: Record<string, string> = {
  PHOTO: "Submit a photo as proof of completion.",
  VIDEO: "Submit a video as proof of completion.",
  TEXT: "Submit a written description as proof of completion.",
};

function toFrontendDare(b: BackendDare): Dare {
  return {
    id: b.id,
    title: b.title,
    description: b.description,
    category: CATEGORY_FROM_BACKEND[b.category] ?? "Fun",
    reward: parseFloat(b.rewardAmount),
    status: STATUS_FROM_BACKEND[b.status] ?? "open",
    proofRequirement: PROOF_TYPE_LABEL[b.proofType] ?? "Submit proof of completion.",
    createdBy: b.creator?.username ?? "Unknown",
  };
}

function detectProofType(proofRequirement: string): string {
  const lower = proofRequirement.toLowerCase();
  if (lower.includes("video")) return "VIDEO";
  if (lower.includes("photo") || lower.includes("image") || lower.includes("picture")) return "PHOTO";
  return "TEXT";
}

// ─── Service functions ────────────────────────────────────────────────────────

export async function fetchDares(): Promise<Dare[]> {
  const result = await api.get<BackendFeedResponse>("/dares?limit=50");
  return result.dares.map(toFrontendDare);
}

export async function fetchDareById(id: string): Promise<Dare | null> {
  try {
    const dare = await api.get<BackendDare>(`/dares/${id}`);
    return toFrontendDare(dare);
  } catch {
    return null;
  }
}

export interface CreateDareInput {
  title: string;
  description: string;
  category: DareCategory;
  reward: number;
  proofRequirement: string;
}

export async function createDare(input: CreateDareInput): Promise<Dare> {
  // TODO (Phase 8): replace creatorId with the authenticated user's ID from the auth store
  const creatorId = process.env.NEXT_PUBLIC_DEV_CREATOR_ID;

  if (!creatorId) {
    throw new Error("No creator ID available. Set NEXT_PUBLIC_DEV_CREATOR_ID or complete Phase 8 auth.");
  }

  const dare = await api.post<BackendDare>("/dares", {
    creatorId,
    title: input.title,
    description: input.description,
    category: CATEGORY_TO_BACKEND[input.category],
    rewardAmount: input.reward,
    proofType: detectProofType(input.proofRequirement),
  });

  return toFrontendDare(dare);
}

export interface SubmitProofInput {
  dareId: string;
  notes: string;
}

export async function submitProof(_input: SubmitProofInput): Promise<void> {
  // POST /api/submissions — implement in Phase 5
}
