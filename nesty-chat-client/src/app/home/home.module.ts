import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LoginModule } from '../login/login.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    MaterialModule,
    LoginModule,
    CommonModule
  ]
})
export class HomeModule { }
