import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatModule } from './chat/chat.module';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'chat',
    loadChildren: () => ChatModule
  },
  {
    path: '',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
