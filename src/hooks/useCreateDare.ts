import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDare, CreateDareInput } from "@/services/dare.service";

export function useCreateDare() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateDareInput) => createDare(input),
    onSuccess: () => {
      // Invalidate dares cache so feed refreshes when user navigates back
      queryClient.invalidateQueries({ queryKey: ["dares"] });
    },
  });
}
