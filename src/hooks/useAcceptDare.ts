import { useMutation } from "@tanstack/react-query";
import { acceptDare } from "@/services/acceptance.service";
import { useAuthStore } from "@/store/useAuthStore";

export function useAcceptDare() {
  const userId = useAuthStore((s) => s.user?.id);

  return useMutation({
    mutationFn: (dareId: string) => {
      if (!userId) throw new Error("You must be signed in to accept a dare.");
      return acceptDare(dareId, userId);
    },
  });
}
