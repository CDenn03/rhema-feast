"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { GuestStatsCards } from "@/features/guests/components/GuestStatsCards";
import type { GuestInvite, GuestCategory } from "@/features/guests/types";
import { UserPlus, Tags, Search, ChevronRight, Users } from "lucide-react";
import { CreateInviteDialog } from "./CreateInviteDialog";
import { ViewInviteDialog } from "./ViewInviteDialog";
import { CategoriesDialog } from "./CategoriesDialog";

interface Props {
  eventId: string;
  eventName: string;
  invites: GuestInvite[];
  categories: GuestCategory[];
  guestInvitesEnabled: boolean;
}

export function GuestsPageClient({ eventId, eventName, invites, categories, guestInvitesEnabled }: Props) {
  const [showCreate, setShowCreate] = useState(false);
  const [showView, setShowView] = useState<GuestInvite | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const confirmed = invites.filter((i) => i.status === "confirmed").length;
  const declined = invites.filter((i) => i.status === "declined").length;
  const pending = invites.filter((i) => i.status === "pending").length;

  const filtered = invites.filter((i) => {
    if (statusFilter && i.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        i.name.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        (i.organization ?? "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Guest Management"
        description={`Manage special guests for ${eventName}`}
        breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Events", href: "/events" }, { label: eventName }]}
        actions={
          <div className="flex gap-3">
            <button
              onClick={() => setShowCreate(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <UserPlus className="h-4 w-4" />
              New Invite
            </button>
            <button
              onClick={() => setShowCategories(true)}
              className="inline-flex items-center gap-2 rounded-xl border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              <Tags className="h-4 w-4" />
              Categories
            </button>
          </div>
        }
      />

      <GuestStatsCards total={invites.length} confirmed={confirmed} declined={declined} pending={pending} />

      {!guestInvitesEnabled && (
        <div className="rounded-3xl border border-accent-gold/20 bg-accent-gold/5 p-6 text-sm text-accent-gold dark:border-accent-gold/30 dark:bg-accent-gold/10 dark:text-accent-gold">
          Guest invites are currently disabled for this event. Enable them in event settings to send invites.
        </div>
      )}

      <SectionSurface>
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guests..."
              className="w-full rounded-xl border bg-card py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="declined">Declined</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl bg-muted/50 p-12 text-center">
            <Users className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              {invites.length === 0 ? "No guest invites yet. Create your first one!" : "No guests match your search."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((invite) => (
              <button
                key={invite.id}
                onClick={() => setShowView(invite)}
                className="flex w-full items-center gap-4 rounded-2xl border bg-card p-4 text-left transition-all hover:shadow-sm"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${invite.category?.color ?? "bg-gray-400"}/10`}>
                  <span className={`text-sm font-bold ${invite.category?.color?.replace("bg-", "text-") ?? "text-gray-400"}`}>
                    {invite.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{invite.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {invite.category?.name}
                    {invite.organization ? ` · ${invite.organization}` : ""}
                  </p>
                </div>
                <div className="hidden text-right text-xs text-muted-foreground sm:block">
                  <p>{invite.email}</p>
                  <p>+{invite.maxPlusOnes} companion slots</p>
                </div>
                <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider
                  ${invite.status === "confirmed" ? "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold" : ""}
                  ${invite.status === "pending" ? "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold" : ""}
                  ${invite.status === "declined" ? "bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground" : ""}
                  ${invite.status === "expired" ? "bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground" : ""}
                `}>
                  {invite.status}
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40" />
              </button>
            ))}
          </div>
        )}
      </SectionSurface>

      <CreateInviteDialog open={showCreate} onOpenChange={setShowCreate} categories={categories} />
      <ViewInviteDialog invite={showView} open={!!showView} onOpenChange={(o) => { if (!o) setShowView(null); }} />
      <CategoriesDialog open={showCategories} onOpenChange={setShowCategories} categories={categories} />
    </div>
  );
}
