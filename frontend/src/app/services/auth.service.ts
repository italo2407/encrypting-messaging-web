import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, shareReplay } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user$ = new BehaviorSubject<any>(null);
  public user$ = this._user$.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http
      .post('http://localhost:3000/auth/login', { email, password })
      .pipe(
        map((res: any) => {
          this.tokenService.setToken(res['access_token']);
        }),
        shareReplay()
      );
  }

  registerUser(name: string, email: string, password: string) {
    return this.http.post('http://localhost:3000/user', {
      name,
      email,
      password,
    });
  }

  setUser() {
    this._user$.next(this.tokenService.decodeToken());
  }

  getUser() {
    return this._user$.getValue();
  }

  isLoggedIn() {
    return !!this.tokenService.getToken();
  }

  logout() {
    this._user$.next(null);
    this.tokenService.clearSession();
  }
}
