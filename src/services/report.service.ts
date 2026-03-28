import { api } from "@/lib/api";

export type ReportTargetType = "DARE" | "SUBMISSION";

export interface CreateReportInput {
  reporterId: string;
  targetType: ReportTargetType;
  targetId: string;
  reason: string;
}

interface BackendReport {
  id: string;
  reporterId: string;
  targetType: ReportTargetType;
  targetId: string;
  reason: string;
  status: string;
  createdAt: string;
}

export async function createReport(input: CreateReportInput): Promise<BackendReport> {
  return api.post<BackendReport>("/reports", input);
}
