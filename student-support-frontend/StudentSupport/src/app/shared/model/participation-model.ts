export interface Participation{
    id?: number;
    eventId: number;
    studentId: number;
    enrollmentDate: Date;
    type: ParticipationType;
}
  
export enum ParticipationType{
    Active,
    Cancelled
}