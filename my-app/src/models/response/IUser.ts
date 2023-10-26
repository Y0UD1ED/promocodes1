export interface IUser {
    email: string;
    isActivated: boolean;
    isSubscribed: boolean;
    sessionCount: Number;
    id: string;
    firstName: string; // Добавлено поле для имени
    lastName: string; // Добавлено поле для фамилии
    middleName: string;
    role: string;
    experience: string;
    contactInfo: string;
    achievements: string;
    aboutMe: string;
    avatar:string;
}