import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, last, switchMap } from 'rxjs/operators';
import { AuthorizationService } from '../authorization-service/authorization.service';

@Injectable({
  providedIn: 'root',
})
export class RecoverPasswordService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _authorizationService: AuthorizationService
  ) {}

  private standartPassword = '111111';

  private _isPasswordReset = false;
  
  get passwordReset() {
    return this._isPasswordReset;
  }

  set passwordReset(value: boolean) {
    this._isPasswordReset = value;
  }

  recoverPassword(login: string): Observable<string> {
    const payload = { login: login };
    return this._http.patch<string>('/api/authorization/restore', payload).pipe(
      switchMap((response) => of(response)),
      catchError((_) => throwError('unknownUser'))
    );
  }

  updatePassword(login: string, password: string): Observable<string> {
    const payload = { newPassword: password };
    return this._authorizationService
      .authorizate(login, this.standartPassword)
      .pipe(
        concatMap((_) => this._http.patch('/api/clients/password', payload)),
        concatMap((_) => this._authorizationService.logOut()),
        concatMap((_) => of('password updateed')),
        last(),
        catchError((error: HttpErrorResponse) => throwError(error.message))
      );
  }
}
