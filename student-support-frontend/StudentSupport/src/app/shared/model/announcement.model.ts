export interface Announcement {
  id: number;
  clubId: number;
  publicationDate: Date;
  content: string;
  announcerId: number;
  images: string[];
}
