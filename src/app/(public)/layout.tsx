import { DashboardShell } from "@/components/layout/DashboardShell";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
