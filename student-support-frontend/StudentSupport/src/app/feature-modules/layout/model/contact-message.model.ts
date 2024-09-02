export interface ContactMessage {
    id: number;
    senderName: string;
    senderSurname: string;
    senderEmail: string;
    messageContent: string;
    SentDate: Date;
    isRead: boolean;
  }