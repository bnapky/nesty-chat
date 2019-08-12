import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { MessagePayload } from '../../../../../src/chat/message-payload';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {
  text = '';

  messages: MessagePayload[] = [];
  room = 0;

  constructor(private chatService: ChatService) {
    this.chatService.$messages.subscribe((messages: MessagePayload[]) => {
      this.messages = messages;
    });

    this.chatService.getMessageList();
  }

  sendMessage(): void {
    this.chatService.sendMessage(this.text);
    this.text = '';
  }

  setRoom(index: string): void {
    if (this.room == +index)
      return;

    this.room = +index;
    this.chatService.joinRoom(index);
  }
}
