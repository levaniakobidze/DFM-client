import { api } from "@/lib/api";

// ── Shared ─────────────────────────────────────────────────────────────────

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ── Types ───────────────────────────────────────────────────────────────────

export type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";
export type ReportStatus = "OPEN" | "REVIEWED" | "DISMISSED";
export type DareStatus = "DRAFT" | "ACTIVE" | "CLOSED" | "COMPLETED" | "REJECTED" | "CANCELLED";
export type UserStatus = "ACTIVE" | "PAUSED" | "BLOCKED";

export interface AdminStats {
  totalDares: number;
  totalUsers: number;
  pendingSubmissions: number;
  openReports: number;
  totalRewardsPaid: number;
  activeThisWeek: number;
}

export interface AdminSubmission {
  id: string;
  dareId: string;
  dareTitle: string;
  submittedBy: string;
  date: string;
  status: SubmissionStatus;
  notes: string;
  reward: number;
  proofUrl: string | null;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  daresCreated: number;
  daresCompleted: number;
  totalEarned: number;
  isAdmin: boolean;
  status: UserStatus;
}

export interface AdminDare {
  id: string;
  title: string;
  category: string;
  reward: number;
  status: DareStatus;
  createdBy: string;
  createdDate: string;
  submissions: number;
  acceptances: number;
}

export interface AdminReport {
  id: string;
  targetId: string;
  targetType: string;
  reportedBy: string;
  reason: string;
  date: string;
  status: ReportStatus;
}

export interface AdminRequest {
  id: string;
  method: string;
  path: string;
  statusCode: number | null;
  userId: string | null;
  username: string | null;
  ip: string | null;
  userAgent: string | null;
  duration: number | null;
  createdAt: string;
}

// ── Paginated response wrappers ─────────────────────────────────────────────

export interface AdminSubmissionsResponse { submissions: AdminSubmission[]; pagination: Pagination; }
export interface AdminUsersResponse       { users: AdminUser[];             pagination: Pagination; }
export interface AdminDaresResponse       { dares: AdminDare[];             pagination: Pagination; }
export interface AdminReportsResponse     { reports: AdminReport[];         pagination: Pagination; }
export interface AdminRequestsResponse    { requests: AdminRequest[];       pagination: Pagination; }

// ── Mappers ─────────────────────────────────────────────────────────────────

function mapSubmission(s: any): AdminSubmission {
  return {
    id: s.id,
    dareId: s.dareId,
    dareTitle: s.dare?.title ?? "—",
    submittedBy: s.user?.username ?? "Unknown",
    date: formatDate(s.createdAt),
    status: s.status as SubmissionStatus,
    notes: s.note ?? "",
    reward: parseFloat(s.dare?.rewardAmount ?? "0"),
    proofUrl: s.proofUrl ?? null,
  };
}

function mapUser(u: any): AdminUser {
  return {
    id: u.id,
    name: u.username,
    email: u.email,
    joinedDate: formatDate(u.createdAt),
    daresCreated: u.daresCreated ?? 0,
    daresCompleted: u.daresCompleted ?? 0,
    totalEarned: u.totalEarned ?? 0,
    isAdmin: u.isAdmin ?? false,
    status: (u.status ?? "ACTIVE") as UserStatus,
  };
}

function mapDare(d: any): AdminDare {
  return {
    id: d.id,
    title: d.title,
    category: d.category,
    reward: parseFloat(d.rewardAmount ?? "0"),
    status: d.status as DareStatus,
    createdBy: d.creator?.username ?? "Unknown",
    createdDate: formatDate(d.createdAt),
    submissions: d._count?.submissions ?? 0,
    acceptances: d._count?.acceptances ?? 0,
  };
}

function mapReport(r: any): AdminReport {
  return {
    id: r.id,
    targetId: r.targetId,
    targetType: r.targetType,
    reportedBy: r.reporter?.username ?? "Unknown",
    reason: r.reason,
    date: formatDate(r.createdAt),
    status: r.status as ReportStatus,
  };
}

// ── Fetch functions ──────────────────────────────────────────────────────────

export async function fetchAdminStats(): Promise<AdminStats> {
  return api.get<AdminStats>("/admin/stats");
}

export async function fetchAdminSubmissions(params: {
  page?: number; status?: string;
} = {}): Promise<AdminSubmissionsResponse> {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.status) qs.set("status", params.status);
  const raw = await api.get<any>(`/admin/submissions?${qs}`);
  return { submissions: raw.submissions.map(mapSubmission), pagination: raw.pagination };
}

export async function fetchAdminUsers(params: {
  page?: number; search?: string;
} = {}): Promise<AdminUsersResponse> {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.search) qs.set("search", params.search);
  const raw = await api.get<any>(`/admin/users?${qs}`);
  return { users: raw.users.map(mapUser), pagination: raw.pagination };
}

export async function fetchAdminDares(params: {
  page?: number; status?: string; search?: string;
} = {}): Promise<AdminDaresResponse> {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.status) qs.set("status", params.status);
  if (params.search) qs.set("search", params.search);
  const raw = await api.get<any>(`/admin/dares?${qs}`);
  return { dares: raw.dares.map(mapDare), pagination: raw.pagination };
}

export async function fetchAdminReports(params: {
  page?: number; status?: string;
} = {}): Promise<AdminReportsResponse> {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.status) qs.set("status", params.status);
  const raw = await api.get<any>(`/admin/reports?${qs}`);
  return { reports: raw.reports.map(mapReport), pagination: raw.pagination };
}

export async function fetchAdminRequests(params: {
  page?: number; method?: string; statusGroup?: string; search?: string;
} = {}): Promise<AdminRequestsResponse> {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.method) qs.set("method", params.method);
  if (params.statusGroup) qs.set("statusGroup", params.statusGroup);
  if (params.search) qs.set("search", params.search);
  const raw = await api.get<any>(`/admin/requests?${qs}`);
  return { requests: raw.requests, pagination: raw.pagination };
}

// ── Mutations ────────────────────────────────────────────────────────────────

export async function updateAdminUserStatus(id: string, status: UserStatus) {
  return api.patch(`/admin/users/${id}/status`, { status });
}

export async function deleteAdminUser(id: string) {
  return api.delete(`/admin/users/${id}`);
}

export async function updateAdminSubmissionStatus(id: string, status: SubmissionStatus) {
  return api.patch(`/admin/submissions/${id}/status`, { status });
}

export async function updateAdminDareStatus(id: string, status: DareStatus) {
  return api.patch(`/admin/dares/${id}/status`, { status });
}

export async function updateAdminReportStatus(id: string, status: ReportStatus) {
  return api.patch(`/admin/reports/${id}/status`, { status });
}
