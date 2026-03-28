import { api } from "@/lib/api";

export type NotificationType =
  | "DARE_ACCEPTED"
  | "SUBMISSION_APPROVED"
  | "SUBMISSION_REJECTED"
  | "REWARD_RECEIVED"
  | "ACCOUNT_PAUSED"
  | "ACCOUNT_BLOCKED"
  | "ACCOUNT_REACTIVATED";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  dareId: string | null;
  read: boolean;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
  pagination: { total: number; page: number; limit: number; totalPages: number };
}

export async function fetchNotifications(page = 1): Promise<NotificationsResponse> {
  return api.get<NotificationsResponse>(`/notifications?page=${page}`);
}

export async function fetchUnreadCount(): Promise<number> {
  const data = await api.get<{ count: number }>("/notifications/unread-count");
  return data.count;
}

export async function markNotificationRead(id: string): Promise<void> {
  await api.patch(`/notifications/${id}/read`, {});
}

export async function markAllNotificationsRead(): Promise<void> {
  await api.patch("/notifications/read-all", {});
}
