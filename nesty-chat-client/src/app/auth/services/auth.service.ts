import { Injectable } from '@angular/core';
import { IUser } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtToken } from './jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public $session: BehaviorSubject<JwtToken>;

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

  register(user: IUser): Observable<JwtToken> {
    const request = this.http.post<JwtToken>(`${this.API_URL}auth/register`, user);

    request.toPromise()
      .then((jwt: JwtToken) => this.setSession(jwt));

    return request;
  }

  private setSession(jwt: JwtToken) {
    this.$session.next(jwt);
    localStorage.setItem('session', JSON.stringify(jwt));
  }

  login(user: IUser): Observable<JwtToken> {
    const request = this.http.post<JwtToken>(`${this.API_URL}auth/login`, user);

    request.toPromise()
      .then((jwt: JwtToken) => this.setSession(jwt));

    return request;
  }

  private retrieveSessionFromLocalStorage() {
    const value = localStorage.getItem('session');
    const session = value ? JSON.parse(value) : null;
    this.$session = new BehaviorSubject<JwtToken>(session);
  }
}
