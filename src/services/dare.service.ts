import { mockDares, Dare, DareCategory } from "@/lib/mock-data";

// All functions are structured as async API calls.
// Replace the mock implementations with fetch/axios when the backend is ready.
// The hook layer (src/hooks/) does not need to change — only the functions below.

export async function fetchDares(): Promise<Dare[]> {
  await new Promise((r) => setTimeout(r, 600));
  return mockDares;
}

export async function fetchDareById(id: string): Promise<Dare | null> {
  await new Promise((r) => setTimeout(r, 400));
  return mockDares.find((d) => d.id === id) ?? null;
}

export interface CreateDareInput {
  title: string;
  description: string;
  category: DareCategory;
  reward: number;
  proofRequirement: string;
}

export async function createDare(input: CreateDareInput): Promise<Dare> {
  await new Promise((r) => setTimeout(r, 800));
  return {
    id: Date.now().toString(),
    ...input,
    status: "open",
    createdBy: "You",
  };
}

export interface SubmitProofInput {
  dareId: string;
  notes: string;
}

export async function submitProof(input: SubmitProofInput): Promise<void> {
  await new Promise((r) => setTimeout(r, 800));
  // POST /submissions — implement when backend is ready
}
