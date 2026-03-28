import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";

export interface CurrentUser {
  id: string;
  username: string;
  email: string;
  status: "ACTIVE" | "PAUSED" | "BLOCKED";
}

export function useCurrentUser() {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => api.get<CurrentUser | null>("/users/me"),
    enabled: isLoggedIn,
    staleTime: 60_000,
  });
}
