export interface Membership {
  id: number;
  memberId: number;
  clubId: number;
  enrollmentDate: Date;
  status: MembershipStatus;
}

export enum MembershipStatus {
  Member,
  ClubAdmin,
  Left,
  Suspended,
}
