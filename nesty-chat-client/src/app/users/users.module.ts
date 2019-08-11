import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { ChatModule } from '../chat/chat.module';

@NgModule({
  declarations: [UserListComponent],
  providers: [UserService],
  exports: [UserListComponent],
  imports: [
    ChatModule,
    MaterialModule,
    HttpClientModule,
    CommonModule
  ]
})
export class UsersModule { }
