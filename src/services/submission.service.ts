import { api } from "@/lib/api";

interface BackendSubmission {
  id: string;
  dareId: string;
  acceptanceId: string;
  userId: string;
  proofUrl: string | null;
  proofType: string;
  note: string | null;
  status: string;
  createdAt: string;
}

export interface CreateSubmissionInput {
  acceptanceId: string;
  userId: string;
  note?: string;
  proofUrl?: string;
  proofType?: string;
}

export async function createSubmission(input: CreateSubmissionInput): Promise<BackendSubmission> {
  return api.post<BackendSubmission>("/submissions", input);
}
