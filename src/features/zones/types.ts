export interface Zone {
  id: string;
  eventId: string;
  subEventId?: string;
  name: string;
  capacity: number;
  currentCount: number;
  color?: string;
}
