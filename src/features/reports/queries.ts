import { reportsService } from "./services/reportsService";
export async function getEventMetrics(eventId: string) {
  return reportsService.eventMetrics(eventId);
}
