import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAuthorizationToken } from 'src/app/interfaces/authorization/authorization-token';
import { IAuthorizationRequest } from 'src/app/interfaces/authorization/authorization-request';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private readonly http: HttpClient) {}

  authorizate(login: string, password: string): Observable<null | string> {
    const payload: IAuthorizationRequest = {
      login: login,
      password: password,
    };

    return this.http
      .post<IAuthorizationToken | string>(`/api/authorization/token`, payload)
      .pipe(
        switchMap((response) => {
          sessionStorage.setItem('tokens', JSON.stringify(response));
          return of(null);
        })
      );
  }
}
