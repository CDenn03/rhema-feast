"use client";

import { createContext, useContext } from "react";
import type { Session } from "../types";

const SessionContext = createContext<Session | null>(null);

export function SessionProvider({ session, children }: { session: Session | null; children: React.ReactNode }) {
  return <SessionContext value={session}>{children}</SessionContext>;
}

export function useSessionContext() {
  return useContext(SessionContext);
}
