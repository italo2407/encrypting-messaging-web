import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private TOKEN_KEY = 'accessToken';
  constructor() {}
  // Store token securely
  public setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }
  // Retrieve token
  public getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }
  // Remove token
  public removeToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  public clearSession(): void {
    sessionStorage.clear(); // Clear tokens and session data
  }

  public decodeToken(): any {
    return jwtDecode(this.getToken() || '');
  }

  public isTokenExpired(): boolean {
    const decoded: any = this.decodeToken();
    return decoded.exp * 1000 < Date.now();
  }
}
