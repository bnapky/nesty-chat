import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { MessagePayload } from '../../../../../src/chat/message-payload';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  text = '';

  messages: MessagePayload[] = [];

  constructor(private chatService: ChatService) {
    this.chatService.$messages.subscribe((messages:MessagePayload[]) => {
      this.messages = messages;
    });

    this.chatService.getMessageList();
  }

  ngOnInit(): void {

  }

  sendMessage(): void {
    this.chatService.sendMessage(this.text);
    this.text = '';
  }
}
