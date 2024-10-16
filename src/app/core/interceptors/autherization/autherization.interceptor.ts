import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IAuthorizationToken } from 'src/app/interfaces/authorization/authorization-token';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthorizationService } from '../../services/authorization-service/authorization.service';

@Injectable()
export class AutherizationInterceptor implements HttpInterceptor {
  constructor(private readonly _authorizationService: AuthorizationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const storageTokenData = sessionStorage.getItem('tokens');
    const tokens: IAuthorizationToken =
      storageTokenData && JSON.parse(storageTokenData as string);
    let headers = new HttpHeaders();

    if (tokens) {
      headers = headers.append('Authorization', `Bearer ${tokens.accessToken}`);
    }

    const cloned = request.clone({
      headers,
    });
    
    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          tokens &&
            this._authorizationService.refreshToken(tokens).pipe(
              switchMap((response) => {
                const newRequest = this.addToken(request, response.accessToken);
                return next.handle(newRequest);
              })
            );
        }

        return throwError(() => error);
      })
    );
  }

  private addToken(req: HttpRequest<unknown>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
