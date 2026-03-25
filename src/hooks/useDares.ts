import { useQuery } from "@tanstack/react-query";
import { fetchDares } from "@/services/dare.service";
import { DareCategory } from "@/lib/mock-data";

export function useDares(category?: DareCategory | "All") {
  return useQuery({
    queryKey: ["dares", category ?? "All"],
    queryFn: fetchDares,
    select: (data) =>
      category && category !== "All"
        ? data.filter((d) => d.category === category)
        : data,
  });
}
