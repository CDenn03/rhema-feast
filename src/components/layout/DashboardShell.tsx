"use client";

import { Sidebar } from "./Sidebar";
import type { Session } from "@/features/auth/types";

interface Props {
  session?: Session | null;
  children: React.ReactNode;
}

export function DashboardShell({ children }: Props) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
