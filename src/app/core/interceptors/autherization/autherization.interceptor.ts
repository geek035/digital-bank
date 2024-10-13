import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthorizationToken } from 'src/app/interfaces/authorization/authorization-token';

@Injectable()
export class AutherizationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const storageTokenData = sessionStorage.getItem('tokens')
    
    if (storageTokenData) {
      const tokens: IAuthorizationToken = JSON.parse(storageTokenData);
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${tokens.accessToken}`
        }
      });
      return next.handle(cloned);
    }
    return next.handle(request);
  }

}
