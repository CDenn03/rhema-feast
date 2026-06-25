import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function DashboardSurface({ children, className }: Props) {
  return (
    <div className={cn("rounded-[28px] bg-surface p-6", className)}>
      {children}
    </div>
  );
}

export function SectionSurface({ children, className }: Props) {
  return (
    <div className={cn("rounded-3xl border bg-card p-6", className)}>
      {children}
    </div>
  );
}

export function PremiumCard({ children, className }: Props) {
  return (
    <div className={cn("overflow-hidden rounded-3xl border bg-card", className)}>
      {children}
    </div>
  );
}

export function ContentPanel({ children, className }: Props) {
  return (
    <div className={cn("rounded-2xl bg-muted/50 p-6", className)}>
      {children}
    </div>
  );
}
