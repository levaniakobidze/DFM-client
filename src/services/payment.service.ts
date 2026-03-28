import { api } from "@/lib/api";

export interface CheckoutResponse {
  transactionId: string;
  checkoutUrl: string | null;
}

export interface PaymentRecord {
  id: string;
  paddleTransactionId: string;
  amount: string;
  currency: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  createdAt: string;
  dare: { id: string; title: string } | null;
}

export interface PaymentHistoryResponse {
  payments: PaymentRecord[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function createCheckout(
  dareId: string,
  amount: number,
  returnUrl?: string,
  currency?: string
): Promise<CheckoutResponse> {
  return api.post<CheckoutResponse>("/payments/checkout", {
    dareId,
    amount,
    ...(currency ? { currency } : {}),
    ...(returnUrl ? { returnUrl } : {}),
  });
}

export async function getMyPayments(page = 1): Promise<PaymentHistoryResponse> {
  return api.get<PaymentHistoryResponse>(`/payments/me?page=${page}`);
}
