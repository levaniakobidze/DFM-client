import { useQuery } from "@tanstack/react-query";
import { fetchDareById } from "@/services/dare.service";

export function useDare(id: string) {
  return useQuery({
    queryKey: ["dare", id],
    queryFn: () => fetchDareById(id),
    enabled: !!id,
  });
}
