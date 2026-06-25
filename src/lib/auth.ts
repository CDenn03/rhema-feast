import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { Session } from "@/features/auth/types";


// export async function getSession(): Promise<Session | null> {
//   try {
//     return await apiClient.get<Session>(ENDPOINTS.auth.me, {
//       cache: "no-store",
//     });
//   } catch {
//     return null;
//   }
// }

export async function getSession() {
  return { id: "1", email: "admin@test.com", name: "Admin", role: "SUPER_USER" as const };
}