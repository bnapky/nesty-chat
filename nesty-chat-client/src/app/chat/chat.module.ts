import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { ChatRoutingModule } from './chat-routing.module';
import { LobbyComponent } from './lobby/lobby.component';
import { ChatService } from './services/chat.service';
import { AuthModule } from '../auth/auth.module';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [LobbyComponent, MessageComponent],
  providers: [ChatService],
  exports: [LobbyComponent],
  imports: [
    MaterialModule,
    AuthModule,
    FormsModule,
    CommonModule,
    ChatRoutingModule,
  ]
})
export class ChatModule { }
