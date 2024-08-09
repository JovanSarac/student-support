export interface Person {
    id: number;
    name: string;
    surname: string;
    email: string;
    profilePicBase64 : string;
    registrationDate?: Date;
    address?: string;
    phoneNumber?: string;
    birthDate?: Date | null;
    biography?:string;
}