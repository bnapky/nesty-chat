import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken: string = this.auth.getAuthorizationToken();

    if (!authToken)
      return next.handle(req);

    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });

    return next.handle(authReq);
  }
}
