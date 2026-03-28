import { api } from "@/lib/api";

interface BackendAcceptance {
  id: string;
  dareId: string;
  userId: string;
  status: string;
  createdAt: string;
  dare: { id: string; title: string; status: string; rewardAmount: string };
  user: { id: string; username: string; avatarUrl: string | null };
}

export async function acceptDare(dareId: string, userId: string): Promise<BackendAcceptance> {
  return api.post<BackendAcceptance>(`/dares/${dareId}/acceptances`, { userId });
}
