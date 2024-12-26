// token.interceptor.ts
import { inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpHandlerFn } from '@angular/common/http';
import { TokenService } from '../services/token.service';

export function tokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const authToken = inject(TokenService).getToken();
  // Clone the request to add the authentication header.
  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${authToken}`),
  });
  return next(newReq);
}
