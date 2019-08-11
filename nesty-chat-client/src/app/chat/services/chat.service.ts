
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class ChatService {

  constructor(private socket: Socket) { }

  sendMessage(msg: string) {
    this.socket.emit("message", msg);
  }

  getMessage() {
    console.log('GET MESSAGE');
    return this.socket
      .fromEvent("message");
  }
}
