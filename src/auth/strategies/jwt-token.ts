import { IUser } from "src/user/entities/user";

export interface JwtToken {
    access_token: string;
    user: IUser
};
