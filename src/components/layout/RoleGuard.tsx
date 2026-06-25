"use client";

import { useSession } from "@/features/auth/hooks/useSession";
import { hasPermission } from "@/lib/rbac";
import type { Permission } from "@/config/permissions";

interface Props {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGuard({ permission, children, fallback = null }: Props) {
  const { data: session } = useSession();

  if (!session || !hasPermission(session.role, permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
