import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { LoginModule } from '../login/login.module';
import { MaterialModule } from '../material/material.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { ChatModule } from '../chat/chat.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    AuthModule,
    MaterialModule,
    UsersModule,
    LoginModule,
    ChatModule,
    CommonModule
  ]
})
export class HomeModule { }
