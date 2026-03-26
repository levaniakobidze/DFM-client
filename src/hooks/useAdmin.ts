import { useQuery } from "@tanstack/react-query";
import {
  fetchAdminStats,
  fetchAdminSubmissions,
  fetchAdminUsers,
  fetchAdminDares,
  fetchAdminReports,
} from "@/services/admin.service";

export function useAdminStats() {
  return useQuery({ queryKey: ["admin", "stats"], queryFn: fetchAdminStats });
}

export function useAdminSubmissions() {
  return useQuery({ queryKey: ["admin", "submissions"], queryFn: fetchAdminSubmissions });
}

export function useAdminUsers() {
  return useQuery({ queryKey: ["admin", "users"], queryFn: fetchAdminUsers });
}

export function useAdminDares() {
  return useQuery({ queryKey: ["admin", "dares"], queryFn: fetchAdminDares });
}

export function useAdminReports() {
  return useQuery({ queryKey: ["admin", "reports"], queryFn: fetchAdminReports });
}
