import { zoneService } from "./services/zoneService";
export async function getZones(eventId: string) { return zoneService.list(eventId); }
