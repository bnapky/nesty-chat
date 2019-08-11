import { IUser } from './user';

export interface UserSession {
    access_token: string;
    user: IUser
};
