
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Socket } from 'socket.io';
import { BehaviorSubject } from 'rxjs';
import { COMMANDS } from '../../../../../src/chat/constants';
import { IUser } from '../../auth/services/user';
import { UserSession } from '../../auth/services/user-session';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class ChatService {
  session: UserSession = null;
  socket: Socket;
  $users = new BehaviorSubject<IUser[]>([]);

  constructor(private authService: AuthService) {
    this.authService.$session.subscribe((session: UserSession) => {
      this.session = session;

      if (!session)
        return this.disconnect();

      this.socket = io('http://localhost:3000', { query: { token: `${session.access_token}` } });
      this.socket.on(COMMANDS.ONLINE_USERS, (users) => this.$users.next(JSON.parse(users)));
      this.getOnlineUsers();
    });
  }

  getOnlineUsers() {
    if (!this.socket)
      return;

    this.socket.emit(COMMANDS.ONLINE_USERS);
  }

  disconnect(): void {
    if (!this.socket)
      return;

    this.socket.disconnect();
  }
}
