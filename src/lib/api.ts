// Central fetch wrapper for all backend API calls.
// All functions return the `data` field from the standard response envelope:
// { success: true, message: "...", data: {...} }

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/** Thrown when the API returns 4xx with express-validator `errors` array */
export class ApiValidationError extends Error {
  constructor(
    message: string,
    /** `path` from express-validator (e.g. title, description, creatorId) */
    public readonly fieldErrors: Record<string, string>
  ) {
    super(message);
    this.name = "ApiValidationError";
  }
}

async function getAccessToken(): Promise<string | null> {
  try {
    const { createClient } = await import("@/lib/supabase");
    const { data } = await createClient().auth.getSession();
    return data.session?.access_token ?? null;
  } catch {
    return null;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = await getAccessToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
    ...options,
  });

  const json = await res.json();

  if (!res.ok) {
    const raw = Array.isArray(json.errors) ? json.errors : [];
    const fieldErrors: Record<string, string> = {};
    const messages: string[] = [];

    for (const e of raw) {
      if (e && typeof e.msg === "string") {
        messages.push(e.msg);
        if (typeof e.path === "string" && e.path.length > 0) {
          fieldErrors[e.path] = e.msg;
        }
      }
    }

    const combined =
      messages.length > 0 ? messages.join(" • ") : json.message || `API error: ${res.status}`;

    if (messages.length > 0) {
      throw new ApiValidationError(combined, fieldErrors);
    }

    throw new Error(combined);
  }

  return json.data as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(path: string) =>
    request<T>(path, { method: "DELETE" }),
};
