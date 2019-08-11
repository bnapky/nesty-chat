import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';

import { ChatRoutingModule } from './chat-routing.module';
import { LobbyComponent } from './lobby/lobby.component';
import { ChatService } from './services/chat.service';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: { query: { token: 'test' } } };

@NgModule({
  declarations: [LobbyComponent],
  providers: [ChatService],
  imports: [
    FormsModule,
    CommonModule,
    ChatRoutingModule,
    SocketIoModule.forRoot(config),
  ]
})
export class ChatModule { }
