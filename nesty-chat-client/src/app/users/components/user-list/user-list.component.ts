import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/chat/services/chat.service';
import { IUser } from 'src/app/auth/services/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: IUser[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.$users.subscribe(users => this.users = users);
  }

}
