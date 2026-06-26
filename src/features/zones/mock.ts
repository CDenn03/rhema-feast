import type { Zone } from "./types";

export const MOCK_ZONES: Zone[] = [
  { id: "zone_vip", eventId: "evt_001", subEventId: "sub_001", name: "VIP Section", capacity: 200, currentCount: 45, color: "#C89B3C" },
  { id: "zone_balcony", eventId: "evt_001", subEventId: "sub_001", name: "Balcony", capacity: 800, currentCount: 320, color: "#A8842A" },
  { id: "zone_main", eventId: "evt_001", subEventId: "sub_001", name: "Main Hall", capacity: 2000, currentCount: 1500, color: "#D4A017" },
  { id: "zone_garden", eventId: "evt_001", subEventId: "sub_001", name: "Garden Terrace", capacity: 150, currentCount: 40, color: "#B8960C" },
  { id: "zone_green", eventId: "evt_001", subEventId: "sub_001", name: "Green Room (Backstage)", capacity: 50, currentCount: 18, color: "#C5A55A" },
  { id: "zone_kids_hall", eventId: "evt_001", subEventId: "sub_002", name: "Children's Hall", capacity: 200, currentCount: 85, color: "#E8A0BF" },
  { id: "zone_kids_play", eventId: "evt_001", subEventId: "sub_002", name: "Play Area", capacity: 50, currentCount: 25, color: "#B8E0A0" },
  { id: "zone_conf_hall", eventId: "evt_001", subEventId: "sub_003", name: "Conference Hall", capacity: 500, currentCount: 320, color: "#D4A017" },
  { id: "zone_std", eventId: "evt_002", name: "Standard Hall", capacity: 500, currentCount: 300, color: "#D4A017" },
];

export function getMockZones(eventId: string): Zone[] {
  return MOCK_ZONES.filter((z) => z.eventId === eventId);
}

export function getMockZonesBySubEvent(subEventId: string): Zone[] {
  return MOCK_ZONES.filter((z) => z.subEventId === subEventId);
}
