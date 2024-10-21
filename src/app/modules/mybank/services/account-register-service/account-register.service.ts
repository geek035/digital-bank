import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { IOperationInfo } from 'src/app/interfaces/operations/operation-info.interface';
import { IStartOperation } from 'src/app/interfaces/operations/start-operation.interface';
import {
  AccountCurrency,
  AccountType,
  IStepParam,
} from 'src/app/interfaces/operations/step-param.inteface';

@Injectable({
  providedIn: 'root',
})
export class AccountRegisterService {
  constructor(private readonly _http: HttpClient) {}

  public openAccount(
    accountType: AccountType,
    accountCurrency: AccountCurrency,
  ): Observable<IOperationInfo | null> {
    const payload: IStartOperation = { operationCode: 'AccountOpen' };

    let requestId: number;

    const startOperation = this._http
      .put<IOperationInfo>('/api/operations', payload)
      .pipe(
        switchMap((startOperationInfo) => {
          requestId = startOperationInfo.requestId;
          return of(startOperationInfo);
        }),
        catchError((error) => throwError(error)),
      );

    const nextStepOperation = startOperation.pipe(
      mergeMap(() =>
        this.nextStepOperation(requestId, accountType, accountCurrency),
      ),
    );

    const confirmStepOperation = nextStepOperation.pipe(
      mergeMap(() => this.confirmOperation(requestId)),
    );

    return confirmStepOperation;
  }

  private nextStepOperation(
    requestId: number,
    accountType: AccountType,
    accountCurrency: AccountCurrency,
  ): Observable<IOperationInfo | null> {
    const payload: IStepParam[] = [
      {
        identifier: 'AccountType',
        value: accountType,
      },
      {
        identifier: 'Currency',
        value: accountCurrency,
      },
    ];

    return this._http
      .patch<IOperationInfo>(`/api/operations?requestId=${requestId}`, payload)
      .pipe(catchError((error) => this.handleError(error, requestId)));
  }

  private confirmOperation(requestId: number): Observable<IOperationInfo | null> {
    return this._http
      .post<IOperationInfo>(`/api/operations?requestId=${requestId}`, null)
      .pipe(catchError((error) => this.handleError(error, requestId)));
  }

  private handleError(error: HttpErrorResponse, requestId: number) {
    return this._http
      .delete<null>(`/api/operations?requestId=${requestId}`)
      .pipe(mergeMap(() => throwError(error)), catchError((error) => throwError(error)));
  }
}
