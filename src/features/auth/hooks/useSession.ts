"use client";

import { useQuery } from "@tanstack/react-query";
import type { Session } from "../types";

export function useSession() {
  return useQuery<Session | null>({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await fetch("/api/internal/auth");
      if (!res.ok) return null;
      return res.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
