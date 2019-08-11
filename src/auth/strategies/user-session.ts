import { IUser } from "src/user/entities/user";

export interface UserSession {
    access_token: string;
    user: IUser
};
