import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";

export function useCurrentUser() {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ["currentUser", "status"],
    queryFn: () => api.get<{ status: "ACTIVE" | "PAUSED" | "BLOCKED" } | null>("/users/me/status"),
    enabled: isLoggedIn,
    staleTime: 60_000,
  });
}
