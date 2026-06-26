import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { getMockPartners } from "@/features/partners/mock";
import { Handshake, Mail, Phone, Building2 } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_BADGE: Record<string, string> = {
  ACTIVE: "bg-green-500/15 text-green-600 dark:text-green-400",
  PENDING: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  INACTIVE: "bg-muted text-muted-foreground",
};

const TYPE_COLORS: Record<string, string> = {
  SPONSOR: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  MEDIA: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  VENDOR: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
};

export default function AdminPartnersPage() {
  const partners = getMockPartners();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Partners"
        description="Manage partner, sponsor, and vendor registrations."
        breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Partners" }]}
      />

      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard
          icon={<Handshake className="h-5 w-5" />}
          label="Total Partners"
          value={partners.length.toString()}
        />
        <StatCard
          icon={<Handshake className="h-5 w-5" />}
          label="Active"
          value={partners.filter((p) => p.status === "ACTIVE").length.toString()}
        />
        <StatCard
          icon={<Handshake className="h-5 w-5" />}
          label="Pending"
          value={partners.filter((p) => p.status === "PENDING").length.toString()}
        />
        <StatCard
          icon={<Building2 className="h-5 w-5" />}
          label="Sponsors"
          value={partners.filter((p) => p.type === "SPONSOR").length.toString()}
        />
      </div>

      <SectionSurface className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="pb-3 pr-4">Partner</th>
                <th className="pb-3 pr-4">Type</th>
                <th className="pb-3 pr-4">Contact</th>
                <th className="pb-3 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr key={partner.id} className="border-b last:border-0">
                  <td className="py-3 pr-4">
                    <div>
                      <p className="font-medium">{partner.name}</p>
                      <p className="text-xs text-muted-foreground">{partner.id}</p>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${TYPE_COLORS[partner.type] ?? ""}`}>
                      {partner.type}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="space-y-0.5">
                      <p className="inline-flex items-center gap-1.5 text-xs">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {partner.email}
                      </p>
                      {partner.phone && (
                        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {partner.phone}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${STATUS_BADGE[partner.status] ?? ""}`}>
                      {partner.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionSurface>
    </div>
  );
}

function StatCard({
  icon, label, value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-card p-5 transition-all hover:shadow-sm">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-gold/10">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
  );
}
