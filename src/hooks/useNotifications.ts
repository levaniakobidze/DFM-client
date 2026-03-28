import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotifications,
  fetchUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
} from "@/services/notification.service";
import { useAuthStore } from "@/store/useAuthStore";

const STALE = 30_000; // 30 seconds

export function useNotifications(page = 1) {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ["notifications", page],
    queryFn: () => fetchNotifications(page),
    enabled: isLoggedIn,
    staleTime: STALE,
    refetchOnWindowFocus: true,
  });
}

export function useUnreadCount() {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: fetchUnreadCount,
    enabled: isLoggedIn,
    staleTime: STALE,
    refetchOnWindowFocus: true,
    refetchInterval: 60_000, // poll every 60s
  });
}

export function useMarkRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
}

export function useMarkAllRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
}
