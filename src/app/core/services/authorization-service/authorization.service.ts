import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { IAuthorizationToken } from 'src/app/interfaces/authorization/authorization-token';
import { IAuthorizationRequest } from 'src/app/interfaces/authorization/authorization-request';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private readonly http: HttpClient) {}

  authorizate(login: string, password: string): Observable<string> {
    const payload: IAuthorizationRequest = {
      login: login,
      password: password,
    };

    return this.http
      .post<IAuthorizationToken>(`/api/authorization/token`, payload)
      .pipe(
        switchMap((response) => {
          sessionStorage.setItem('tokens', JSON.stringify(response));
          return of('success authorization');
        })
      );
  }

  refreshToken(oldTokens: IAuthorizationToken): Observable<IAuthorizationToken> {
    return this.http
      .post<IAuthorizationToken>(`/api/authorization/refresh`, oldTokens)
      .pipe(
        switchMap((response) => {
          sessionStorage.setItem('tokens', JSON.stringify(response));
          return of(response);
        })
      )
  }

  logOut(): Observable<string> {
    const token = sessionStorage.getItem('tokens');

    if (token) {
      sessionStorage.removeItem('tokens');
      return this.http.delete('/api/authorization/logout').pipe(
        switchMap((_) => of('logout success')),
        catchError((err: HttpErrorResponse) => throwError(err)));
    }

    return of('not logged in');
  }
}
