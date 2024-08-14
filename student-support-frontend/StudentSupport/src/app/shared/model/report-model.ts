export interface Report {
  id: number;
  eventId: number;
  studentId: number;
  date: Date;
  type: ReportType;
  status: ReportStatus;
}

export enum ReportType {
  Harassment,
  Nudity,
  Spam,
  FraudOrScam,
  Fake,
  Violence,
  HateSpeech,
}

export enum ReportStatus {
  Pending,
  Resolved,
  Dismissed,
  Closed,
}
