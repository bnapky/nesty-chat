import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { interceptorProviders } from './interceptors';

@NgModule({
  declarations: [],
  providers: [AuthService, interceptorProviders],
  exports: [],
  imports: [
    HttpClientModule,
    CommonModule
  ]
})
export class AuthModule { }
