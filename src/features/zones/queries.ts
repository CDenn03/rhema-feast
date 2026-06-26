import { zoneService } from "./services/zoneService";
import { getMockZonesBySubEvent } from "./mock";

export async function getZones(eventId: string) { return zoneService.list(eventId); }

export async function getZonesBySubEvent(subEventId: string) {
  return getMockZonesBySubEvent(subEventId);
}
