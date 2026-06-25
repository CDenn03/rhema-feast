import { DashboardShell } from "@/components/layout/DashboardShell";

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
