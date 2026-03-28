import { api } from "@/lib/api";

export interface ProfileStats {
  daresCreated: number;
  daresCompleted: number;
  totalEarned: number;
  successRate: number;
}

export interface MyProfile {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  status: "ACTIVE" | "PAUSED" | "BLOCKED";
  displayName: string;
  bio: string | null;
  createdAt: string;
  stats: ProfileStats;
}

export interface ProfileDare {
  id: string;
  title: string;
  description: string;
  category: string;
  rewardAmount: string;
  status: string;
  createdAt: string;
  creator: { id: string; username: string; avatarUrl: string | null };
  _count: { acceptances: number; submissions: number };
}

export interface ProfileAcceptance {
  id: string;
  status: string;
  createdAt: string;
  dare: ProfileDare & { _count: { acceptances: number } };
}

export interface ActivityItem {
  id: string;
  type: "success" | "rejected" | "pending" | "category";
  label: string;
  dareId: string;
  createdAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function fetchMyProfile(): Promise<MyProfile> {
  return api.get<MyProfile>("/users/me");
}

export async function updateMyProfile(data: { displayName?: string; bio?: string }): Promise<MyProfile> {
  return api.patch<MyProfile>("/users/me", data);
}

export async function fetchMyDares(page = 1): Promise<{ dares: ProfileDare[]; pagination: Pagination }> {
  return api.get(`/users/me/dares?page=${page}`);
}

export async function fetchMyAcceptances(params: { page?: number; status?: string; dareId?: string } = {}): Promise<{ acceptances: ProfileAcceptance[]; pagination: Pagination }> {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.status) qs.set("status", params.status);
  if (params.dareId) qs.set("dareId", params.dareId);
  return api.get(`/users/me/acceptances?${qs}`);
}

export async function fetchMyActivity(): Promise<ActivityItem[]> {
  return api.get<ActivityItem[]>("/users/me/activity");
}
