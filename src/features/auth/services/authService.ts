import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { LoginCredentials, LoginResponse } from "../types";

export const authService = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<LoginResponse>(ENDPOINTS.auth.login, credentials),

  logout: () => apiClient.post(ENDPOINTS.auth.logout),

  register: (data: { email: string; password: string; name: string }) =>
    apiClient.post(ENDPOINTS.auth.register, data),
};
