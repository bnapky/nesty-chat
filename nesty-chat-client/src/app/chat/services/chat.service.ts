
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Socket } from 'socket.io';
import { BehaviorSubject } from 'rxjs';
import { ACTIONS } from '../../../../../src/chat/constants';
import { IUser } from '../../auth/services/user';
import { UserSession } from '../../auth/services/user-session';
import { AuthService } from '../../auth/services/auth.service';
import { MessagePayload } from '../../../../../src/chat/message-payload';

@Injectable()
export class ChatService {

  session: UserSession = null;
  socket: Socket;
  $users = new BehaviorSubject<IUser[]>([]);
  $messages = new BehaviorSubject<MessagePayload[]>([]);
  messageListLimit = 50;

  constructor(private authService: AuthService) {
    this.authService.$session.subscribe((session: UserSession) => {
      this.session = session;

      if (!session)
        return this.disconnect();

      this.socket = io('http://localhost:3000', { query: { token: `${session.access_token}` } });
      this.socket.on(ACTIONS.ONLINE_USERS, (users) => this.$users.next(JSON.parse(users)));
      this.socket.on(ACTIONS.MESSAGE_LIST, (data) => {
        let messages: MessagePayload[] = JSON.parse(data);

        if (messages.length > this.messageListLimit)
          messages = messages.slice(0, this.messageListLimit);

        this.$messages.next(messages);
      }
      );

      this.socket.on(ACTIONS.MESSAGE, (data: string) => {
        let messages: MessagePayload[] = [JSON.parse(data), ...this.$messages.value];

        if (messages.length > this.messageListLimit)
          messages = messages.slice(0, this.messageListLimit);


        this.$messages.next(messages);
      });
      this.getOnlineUsers();
    });
  }

  sendMessage(text: string) {
    if (!(this.socket && this.session))
      return;

    const payload: MessagePayload = {
      text, timestamp: new Date(), user: { username: this.session.user.username, userId: this.session.user.id }
    };

    this.socket.emit(ACTIONS.MESSAGE, JSON.stringify(payload));
  }

  getMessageList() {
    if (!(this.socket && this.session))
      return;

    this.socket.emit(ACTIONS.MESSAGE_LIST);
  }

  getOnlineUsers() {
    if (!this.socket)
      return;

    this.socket.emit(ACTIONS.ONLINE_USERS);
  }

  disconnect(): void {
    if (!this.socket)
      return;

    this.socket.disconnect();
  }
}
