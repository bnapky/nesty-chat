import { Socket } from "socket.io";

export interface OnlineUser {
    userId: number;
    client?: Socket;
    online?: boolean;
    username: string;
}