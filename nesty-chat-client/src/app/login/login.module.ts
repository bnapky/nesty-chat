import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { MaterialModule } from '../material/material.module';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [
    AuthModule,
    MaterialModule,
    CommonModule,
    FormsModule
  ]
})
export class LoginModule { }
