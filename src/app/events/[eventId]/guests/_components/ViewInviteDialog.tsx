"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { QRCodeDisplay } from "@/features/guests/components/QRCodeDisplay";
import type { GuestInvite } from "@/features/guests/types";
import { Mail, Phone, Building2, Users, MapPin, Clock, Tag } from "lucide-react";

interface Props {
  invite: GuestInvite | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusStyles: Record<string, string> = {
  confirmed: "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold",
  pending: "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold",
  declined: "bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground",
  expired: "bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground",
};

export function ViewInviteDialog({ invite, open, onOpenChange }: Props) {
  if (!invite) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle>{invite.name}</DialogTitle>
            <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${statusStyles[invite.status] ?? ""}`}>
              {invite.status}
            </span>
          </div>
          <DialogDescription>{invite.organization ?? "Guest"}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 -mx-6 px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
              <Mail className="h-5 w-5 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="truncate font-medium">{invite.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
              <Phone className="h-5 w-5 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium">{invite.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
              <Building2 className="h-5 w-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Organization</p>
                <p className="font-medium">{invite.organization ?? "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
              <Tag className="h-5 w-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="font-medium">{invite.category?.name ?? "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
              <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Zone</p>
                <p className="font-medium">{invite.zoneId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
              <Users className="h-5 w-5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Companions</p>
                <p className="font-medium">{invite.confirmation?.companionCount ?? 0} / {invite.maxPlusOnes} slots</p>
              </div>
            </div>
          </div>

          {invite.companions && invite.companions.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Companions</p>
              <div className="space-y-2">
                {invite.companions.map((comp) => (
                  <div key={comp.id} className="flex items-center gap-3 rounded-xl border bg-card/50 px-4 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{comp.name}</p>
                      <p className="text-xs text-muted-foreground">Companion</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {invite.qrCodes && invite.qrCodes.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">QR Codes</p>
              <QRCodeDisplay qrCodes={invite.qrCodes} />
            </div>
          )}
        </div>

        <DialogFooter>
          {invite.status === "pending" && (
            <button className="rounded-xl bg-accent-gold px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-gold/90">
              Resend Invitation
            </button>
          )}
          {invite.status === "confirmed" && (
            <button className="rounded-xl border bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:bg-muted">
              Edit Details
            </button>
          )}
          {invite.status === "declined" && (
            <button className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              Re-issue Invite
            </button>
          )}
          {invite.status === "expired" && (
            <button className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              Re-issue Invite
            </button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
