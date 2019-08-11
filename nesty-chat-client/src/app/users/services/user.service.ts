import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/auth/services/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  $users = new BehaviorSubject<IUser[]>([]);

  readonly API_URL = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {}

  getUsers(): void {
    this.httpClient.get<IUser[]>(`${this.API_URL}users`)
      .subscribe((users: IUser[]) => {
        this.$users.next(users);
      })
  }
}
