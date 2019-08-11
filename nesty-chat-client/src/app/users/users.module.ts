import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [UserListComponent],
  providers: [UserService],
  imports: [
    MaterialModule,
    HttpClientModule,
    CommonModule
  ]
})
export class UsersModule { }
