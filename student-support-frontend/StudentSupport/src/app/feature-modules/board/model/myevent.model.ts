export interface MyEvent {
  id: number;
  userId: number;
  name: string;
  description: string;
  dateEvent: Date;
  dateEndEvent: Date;
  address: string;
  latitude: number;
  longitude: number;
  eventType: string;
  datePublication: Date;
  image: string;
  isArchived: boolean;
  price?: number;
}
