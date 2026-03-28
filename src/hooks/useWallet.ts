import { useQuery } from "@tanstack/react-query";
import { fetchWallet } from "@/services/wallet.service";
import { useAuthStore } from "@/store/useAuthStore";

export function useWallet() {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: ["wallet", userId],
    queryFn: () => fetchWallet(userId!),
    enabled: !!userId,
  });
}
