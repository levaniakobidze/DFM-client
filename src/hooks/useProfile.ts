import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchMyProfile,
  updateMyProfile,
  fetchMyDares,
  fetchMyAcceptances,
  fetchMyActivity,
} from "@/services/profile.service";
import { useAuthStore } from "@/store/useAuthStore";

export function useMyProfile() {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ["profile", "me"],
    queryFn: fetchMyProfile,
    enabled: isLoggedIn,
    staleTime: 30_000,
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile", "me"] }),
  });
}

export function useMyDares(page = 1) {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ["profile", "dares", page],
    queryFn: () => fetchMyDares(page),
    enabled: isLoggedIn,
    staleTime: 30_000,
  });
}

export function useMyAcceptances(params: { page?: number; status?: string; dareId?: string } = {}) {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ["profile", "acceptances", params],
    queryFn: () => fetchMyAcceptances(params),
    enabled: isLoggedIn,
    staleTime: 30_000,
  });
}

export function useMyActivity() {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ["profile", "activity"],
    queryFn: fetchMyActivity,
    enabled: isLoggedIn,
    staleTime: 30_000,
  });
}
