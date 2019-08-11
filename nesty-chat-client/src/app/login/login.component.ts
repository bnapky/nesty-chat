import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { IUser } from '../auth/services/user';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtToken } from '../auth/services/jwt';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentUser: IUser;
  user: IUser = { username: '', password: '' };
  isLoggedIn = false;
  snackBarDuration = 5000;

  constructor(private authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.authService.$session.subscribe((session: JwtToken) => {
      this.isLoggedIn = Boolean(session);

      if (session)
        this.currentUser = session.user;
    })
  }

  submit(action: (user: IUser) => Observable<JwtToken>, message?: string, error?: string) {
    action(this.user)
      .toPromise()
      .then(() => this._snackBar.open(message, null, { duration: this.snackBarDuration }))
      .catch((response: HttpErrorResponse) => {
        this._snackBar.open(error || response.error.message, null, { duration: this.snackBarDuration });
      });
  }

  login() {
    this.submit(this.authService.login.bind(this.authService), `Welcome, ${this.user.username}!`, 'Invalid username or password.');
  }

  register() {
    this.submit(this.authService.register.bind(this.authService), `Welcome, ${this.user.username}!`);
  }

  logout() {
    this.authService.logout();
  }
}
