import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

export const AuthContextGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  if (tokenService.getToken() && !tokenService.isTokenExpired()) {
    authService.setUser();
  }

  return true;
};
