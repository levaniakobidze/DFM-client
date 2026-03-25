import { useQuery } from "@tanstack/react-query";
import { fetchWallet } from "@/services/wallet.service";

export function useWallet() {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: fetchWallet,
  });
}
