import { Badge } from "@/components/ui/badge";
import { EVENT_STATUS_LABELS, EVENT_STATUS_COLORS } from "../constants";
import type { EventStatus } from "@/config/event";

interface Props {
  status: EventStatus;
}

export function EventStatusBadge({ status }: Props) {
  return (
    <Badge variant={EVENT_STATUS_COLORS[status] as "default" | "secondary" | "outline" | "destructive"}>
      {EVENT_STATUS_LABELS[status]}
    </Badge>
  );
}
