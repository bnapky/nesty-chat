import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  message = '';

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {

  }

  onSendMessageClick(): void {

  }
}
