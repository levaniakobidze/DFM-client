import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdminStats,
  fetchAdminSubmissions,
  fetchAdminUsers,
  fetchAdminDares,
  fetchAdminReports,
  fetchAdminRequests,
  updateAdminUserStatus,
  deleteAdminUser,
  updateAdminSubmissionStatus,
  updateAdminDareStatus,
  updateAdminReportStatus,
} from "@/services/admin.service";
import type { SubmissionStatus, DareStatus, ReportStatus, UserStatus } from "@/services/admin.service";

// ── Queries ──────────────────────────────────────────────────────────────────

export function useAdminStats() {
  return useQuery({ queryKey: ["admin", "stats"], queryFn: fetchAdminStats });
}

export function useAdminSubmissions(params: { page?: number; status?: string } = {}) {
  return useQuery({
    queryKey: ["admin", "submissions", params],
    queryFn: () => fetchAdminSubmissions(params),
  });
}

export function useAdminUsers(params: { page?: number; search?: string } = {}) {
  return useQuery({
    queryKey: ["admin", "users", params],
    queryFn: () => fetchAdminUsers(params),
  });
}

export function useAdminDares(params: { page?: number; status?: string; search?: string } = {}) {
  return useQuery({
    queryKey: ["admin", "dares", params],
    queryFn: () => fetchAdminDares(params),
  });
}

export function useAdminReports(params: { page?: number; status?: string } = {}) {
  return useQuery({
    queryKey: ["admin", "reports", params],
    queryFn: () => fetchAdminReports(params),
  });
}

export function useAdminRequests(params: {
  page?: number; method?: string; statusGroup?: string; search?: string;
} = {}) {
  return useQuery({
    queryKey: ["admin", "requests", params],
    queryFn: () => fetchAdminRequests(params),
  });
}

// ── Mutations ────────────────────────────────────────────────────────────────

export function useUpdateUserStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: UserStatus }) =>
      updateAdminUserStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "users"] }),
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAdminUser(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
      qc.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}

export function useUpdateSubmissionStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: SubmissionStatus }) =>
      updateAdminSubmissionStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "submissions"] });
      qc.invalidateQueries({ queryKey: ["admin", "dares"] });
      qc.invalidateQueries({ queryKey: ["admin", "stats"] });
      // Invalidate the public dare cache so the proof + completed status shows immediately
      qc.invalidateQueries({ queryKey: ["dare"] });
      qc.invalidateQueries({ queryKey: ["dares"] });
    },
  });
}

export function useUpdateDareStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: DareStatus }) =>
      updateAdminDareStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "dares"] });
      qc.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}

export function useUpdateReportStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ReportStatus }) =>
      updateAdminReportStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "reports"] });
      qc.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}
