import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDare, CreateDareInput } from "@/services/dare.service";
import { useAuthStore } from "@/store/useAuthStore";

export function useCreateDare() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((s) => s.user?.id);

  return useMutation({
    mutationFn: (input: CreateDareInput) => {
      if (!userId) throw new Error("You must be signed in to create a dare.");
      return createDare(input, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dares"], refetchType: "active" });
    },
  });
}
