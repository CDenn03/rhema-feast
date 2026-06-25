"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { getMockCampaigns } from "@/features/communications/mock";
import { MessageSquare, Search, Mail, Smartphone, Bell, CheckCircle2, Clock, FileEdit } from "lucide-react";

const channelIcons: Record<string, React.ReactNode> = {
  EMAIL: <Mail className="h-4 w-4" />,
  SMS: <Smartphone className="h-4 w-4" />,
  PUSH: <Bell className="h-4 w-4" />,
};

const statusStyles: Record<string, string> = {
  SENT: "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold",
  SCHEDULED: "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold",
  DRAFT: "bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground",
};

export default function EventCommunicationsPage() {
  const params = useParams();
  const eventId = params.eventId as string;

  const campaigns = useMemo(() => getMockCampaigns(), []);
  const [search, setSearch] = useState("");

  const sentCount = campaigns.filter((c) => c.status === "SENT").length;
  const scheduledCount = campaigns.filter((c) => c.status === "SCHEDULED").length;
  const draftCount = campaigns.filter((c) => c.status === "DRAFT").length;

  const filtered = useMemo(() => {
    if (!search) return campaigns;
    const q = search.toLowerCase();
    return campaigns.filter((c) => c.name.toLowerCase().includes(q));
  }, [campaigns, search]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Communications"
        description="Manage email, SMS, and push notification campaigns."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Events", href: "/events" },
          { label: "Communications" },
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <CheckCircle2 className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sent</p>
              <p className="text-2xl font-bold">{sentCount}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <Clock className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Scheduled</p>
              <p className="text-2xl font-bold">{scheduledCount}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <FileEdit className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Drafts</p>
              <p className="text-2xl font-bold">{draftCount}</p>
            </div>
          </div>
        </div>
      </div>

      <SectionSurface>
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search campaigns..." className="w-full rounded-xl border bg-card py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring" />
          </div>
        </div>
        <div className="space-y-3">
          {filtered.map((c) => (
            <div key={c.id} className="flex items-center gap-4 rounded-2xl border bg-card p-5 transition-all hover:shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                {channelIcons[c.channel]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{c.name}</p>
                {c.subject && <p className="text-sm text-muted-foreground truncate">{c.subject}</p>}
                <p className="text-xs text-muted-foreground/60 mt-0.5">{c.channel} campaign</p>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${statusStyles[c.status]}`}>
                  {c.status === "SENT" && <CheckCircle2 className="h-3 w-3" />}
                  {c.status === "SCHEDULED" && <Clock className="h-3 w-3" />}
                  {c.status === "DRAFT" && <FileEdit className="h-3 w-3" />}
                  {c.status}
                </span>
                {c.scheduledAt && (
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {c.status === "SENT" ? "Sent" : "Scheduled"}: {new Date(c.scheduledAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionSurface>
    </div>
  );
}
