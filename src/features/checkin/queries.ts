import { checkinService } from "./services/checkinService";

export async function getCheckInLogs(eventId: string) {
  return checkinService.getLogs(eventId);
}
