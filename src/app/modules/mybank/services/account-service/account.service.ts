import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IAccountModel } from 'src/app/interfaces/mybank/account-model.interace';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private readonly _http: HttpClient) {}

  getAccounts(): Observable<IAccountModel[]> {
    return this._http.get<IAccountModel[]>('/api/accounts').pipe(
      switchMap((allAccounts) => {
        const accounts = allAccounts.filter((account, idx) => 
          account.name === 'Накопительный счёт' ||
          account.name === 'Текущий счёт'
        );
        return of(accounts)
      }),
      catchError((error) => throwError(error)),
    );
  }

  updateAccount(accountId: number, name: string) {
    const paypal = { accountId, name };

    return this._http.patch<IAccountModel>('/api/accounts', paypal).pipe(
      switchMap((account) => of(account)),
      catchError((error) => throwError(error)),
    );
  }

  getAccount(accountId: number): Observable<IAccountModel> {
    return this._http.get<IAccountModel>(`/api/accounts/${accountId}`).pipe(
      switchMap((account) => of(account)),
      catchError((error) => throwError(error)),
    );
  }

  lockAccount(accountId: number): Observable<IAccountModel> {
    return this._http
      .patch<IAccountModel>(`/api/accounts/lock/${accountId}`, null)
      .pipe(
        switchMap((account) => of(account)),
        catchError((error) => throwError(error)),
      );
  }

  unlockAccount(accountId: number): Observable<IAccountModel> {
    return this._http
      .patch<IAccountModel>(`/api/accounts/unlock/${accountId}`, null)
      .pipe(
        switchMap((account) => of(account)),
        catchError((error) => throwError(error)),
      );
  }
}
