export interface Person {
    id: number;
    name: string;
    surname: string;
    email: string;
    profilePic : string;
    registrationDate?: Date;
    address?: string;
    phoneNumber?: string;
    birthDate?: Date;
    biography?:string;
}