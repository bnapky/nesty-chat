import { Injectable } from '@angular/core';
import { IUser } from './user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserSession } from './user-session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public $session: BehaviorSubject<UserSession>;

  //This should be hidden away in a config file :)
  readonly API_URL = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
    this.retrieveSessionFromLocalStorage();
  }

  getAuthorizationToken(): string {
    if (!this.$session.value)
      return null;

    return `Bearer ${this.$session.value.access_token}`;
  }

  logout() {
    this.$session.next(null);
    localStorage.removeItem('session');
  }

  register(user: IUser): Promise<UserSession> {
    const request = this.http.post<UserSession>(`${this.API_URL}auth/register`, user).toPromise();
    request.then((jwt: UserSession) => this.setSession(jwt));

    return request;
  }

  private setSession(jwt: UserSession) {
    this.$session.next(jwt);
    localStorage.setItem('session', JSON.stringify(jwt));
  }

  login(user: IUser): Promise<UserSession> {
    const request = this.http.post<UserSession>(`${this.API_URL}auth/login`, user).toPromise();
    request.then((jwt: UserSession) => this.setSession(jwt));

    return request;
  }

  private retrieveSessionFromLocalStorage() {
    const value = localStorage.getItem('session');
    const session = value ? JSON.parse(value) : null;
    this.$session = new BehaviorSubject<UserSession>(session);
  }
}
