import { ENDPOINTS } from "./endpoints";

type RequestOptions = RequestInit & {
  params?: Record<string, unknown>;
};

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function apiFetch<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, ...init } = options;

  const fullUrl = params
    ? `${url}?${new URLSearchParams(
        Object.entries(params)
          .filter(([_, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)])
      )}`
    : url;

  const res = await fetch(fullUrl, {
    ...init,
    credentials: "include", // send HttpOnly cookie
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new ApiError(res.status, data?.message ?? res.statusText, data);
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(url: string, options?: RequestOptions) =>
    apiFetch<T>(url, { ...options, method: "GET" }),

  post: <T>(url: string, body?: unknown, options?: RequestOptions) =>
    apiFetch<T>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(url: string, body?: unknown, options?: RequestOptions) =>
    apiFetch<T>(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: <T>(url: string, body?: unknown, options?: RequestOptions) =>
    apiFetch<T>(url, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T>(url: string, options?: RequestOptions) =>
    apiFetch<T>(url, { ...options, method: "DELETE" }),
};

export { ApiError };
export { ENDPOINTS };
