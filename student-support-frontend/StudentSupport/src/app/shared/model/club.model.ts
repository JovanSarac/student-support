import { Announcement } from './announcement.model';
import { Membership } from './membership.model';

export interface Club {
  id: number;
  name: string;
  description: string;
  ownerId: number;
  memberships: Membership[];
  announcements: Announcement[];
  eventIds: number[];
  status: ClubStatus;
  address: string;
  latitude: number;
  longitude: number;
  datePublication: Date;
  categoryClub: string;
  coverImage: string;
}

export enum ClubStatus {
  Active,
  Closed,
  ClosedByAdmin,
}
