import { OnlineUser } from './online-user';

export interface MessagePayload {
    text: string;
    timestamp: Date
    user: OnlineUser;
}