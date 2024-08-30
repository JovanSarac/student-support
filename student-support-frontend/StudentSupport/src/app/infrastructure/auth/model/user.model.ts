export interface User {
  id: number;
  username: string;
  role: string;
  isActive?: boolean;
  isVerified?: boolean
}
