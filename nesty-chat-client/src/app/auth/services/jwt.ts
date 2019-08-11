import { IUser } from './user';

export interface JwtToken {
    access_token: string;
    user: IUser
};
