import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';
import { User } from './models/user.model';
import { LoginModel } from './models/login.model';
import { UserDataService } from '../core/store/user-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userData: UserDataService, public router: Router) { }

  redirectUrl: string | null = null;
  currentUser: User | null = null;

  login(loginM: LoginModel): Observable<boolean> {

    const user: User = {
      id: 1,
      email: loginM.email,
      firstName: "Ricardo",
      lastName: "Sales"
    }

    return of(true).pipe(
      delay(1000),
      tap(() => this.userData.setUser(user))
    );
  }

  logout(): void {
    this.userData.removeUser();
  }

  getUser(): User {

    const user: User = {
      id: 0,
      email: "",
      firstName: "",
      lastName: ""
    }

    this.currentUser = this.userData.getUser();
    if (this.currentUser) {
      return this.currentUser;
    }

    return user
  }

  isLoggedIn(): Boolean {
    return this.getUser().id !== 0;
  }
}