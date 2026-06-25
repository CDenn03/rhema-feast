import { Users, UserCheck, UserX, Clock } from "lucide-react";

interface Props {
  total: number;
  confirmed: number;
  declined: number;
  pending: number;
}

const cards = [
  { key: "total", label: "Total Invited", icon: Users, value: 0, color: "bg-accent-gold" },
  { key: "confirmed", label: "Confirmed", icon: UserCheck, value: 0, color: "bg-accent-gold" },
  { key: "declined", label: "Declined", icon: UserX, value: 0, color: "bg-accent-gold" },
  { key: "pending", label: "Pending", icon: Clock, value: 0, color: "bg-accent-gold" },
];

export function GuestStatsCards({ total, confirmed, declined, pending }: Props) {
  const data = { total, confirmed, declined, pending };
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div key={card.key} className="rounded-3xl border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.color}/10`}>
              <card.icon className={`h-6 w-6 ${card.color.replace("bg-", "text-")}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="text-2xl font-bold">{data[card.key as keyof typeof data]}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
