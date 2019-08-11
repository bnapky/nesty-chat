import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatRoutingModule } from './chat-routing.module';
import { LobbyComponent } from './lobby/lobby.component';
import { ChatService } from './services/chat.service';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [LobbyComponent],
  providers: [ChatService],
  imports: [
    AuthModule,
    FormsModule,
    CommonModule,
    ChatRoutingModule,
  ]
})
export class ChatModule { }
