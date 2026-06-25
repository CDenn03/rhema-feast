export interface Zone {
  id: string;
  eventId: string;
  name: string;
  capacity: number;
  currentCount: number;
  color?: string;
}
