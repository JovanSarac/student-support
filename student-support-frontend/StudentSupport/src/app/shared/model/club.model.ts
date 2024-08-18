import { Membership } from './membership.model';

export interface Club {
  id: number;
  name: string;
  description: string;
  ownerId: number;
  memberships: Membership[];
  eventIds: number[];
  status: ClubStatus;
  address: string;
  latitude: number;
  longitude: number;
  coverImage: string;
}

export enum ClubStatus {
  Active,
  Closed,
  ClosedByAdmin,
}
