import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { IAccountModel } from 'src/app/interfaces/mybank/account-model.interace';
import { IOperationInfo } from 'src/app/interfaces/operations/operation-info.interface';
import { IStartOperation } from 'src/app/interfaces/operations/start-operation.interface';
import { IStepParam } from 'src/app/interfaces/operations/step-param.inteface';
import { ITransferOperationForm } from '../../components/transactions-operations/transfer-operation/transfer-operation.component';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(
    private readonly _http: HttpClient,
  ) {}

  transferAccount(
    paypalObj: ITransferOperationForm,
  ): Observable<IOperationInfo> {
    const operationCode: IStartOperation = { operationCode: 'AccountTransfer' };

    const startOperation = this._http
      .put<IOperationInfo>('/api/operations', operationCode)
      .pipe(
        switchMap((operationInfo) => of(operationInfo)),
        catchError((error) => throwError(error)),
      );

    const nextStep = startOperation.pipe(
      mergeMap((operationInfo) =>
        this.transferAccountNextStep(operationInfo, paypalObj),
      ),
    );

    const confirmStep = nextStep.pipe(
      mergeMap((operationInfo) =>
        this.transferAccountConfirmStep(operationInfo),
      ),
    );

    return confirmStep;
  }

  private transferAccountNextStep(
    operationInfo: IOperationInfo,
    paypalObj: ITransferOperationForm,
  ): Observable<IOperationInfo> {
    const stepParamAccount = operationInfo.stepParams.find(
      (param) => param.identifier === 'SourceAccount',
    );
    if (!stepParamAccount)
      return throwError(
        new HttpErrorResponse({
          error: 'Не нашелся идентификатор операции',
          status: 400,
        }),
      );

    const valueAccount = stepParamAccount.values.find((value) =>
      value.includes(paypalObj.sourceAccount),
    );

    if (!valueAccount)
      return throwError(
        new HttpErrorResponse({
          error: 'Не нашелся счет пользователя',
          status: 400,
        }),
      );

    const paypal: IStepParam[] = [
      {
        identifier: 'SourceAccount',
        value: valueAccount,
      },
      {
        identifier: 'ReceiverAccount',
        value: paypalObj.reciverAccount,
      },
      {
        identifier: 'Amount',
        value: paypalObj.amount.toString(),
      },
      {
        identifier: 'Comment',
        value: paypalObj.comment,
      },
    ];

    return this._http
      .patch<IOperationInfo>(
        `/api/operations?requestId=${operationInfo.requestId}`,
        paypal,
      )
      .pipe(catchError((error) => this.handleError(error, operationInfo)));
  }

  private transferAccountConfirmStep(
    operationInfo: IOperationInfo,
  ): Observable<IOperationInfo> {
    return this._http
      .post<IOperationInfo>(
        `/api/operations?requestId=${operationInfo.requestId}`,
        null,
      )
      .pipe(catchError((error) => this.handleError(error, operationInfo)));
  }

  refillAccount(
    account: string,
    amount: number,
  ): Observable<IOperationInfo> {
    const payload: IStartOperation = { operationCode: 'AccountRefill' };

    const startOperation = this._http
      .put<IOperationInfo>('/api/operations', payload)
      .pipe(
        switchMap((firstStepOperationInfo) => of(firstStepOperationInfo)),
        catchError((error) => throwError(error)),
      );

    const nextStep = startOperation.pipe(
      mergeMap((operationInfo) =>
        this.topUpAccountNextStep(operationInfo, account, amount),
      ),
    );

    const confirmStep = nextStep.pipe(
      mergeMap((operationInfo) => this.topUpAccountConfirmStep(operationInfo)),
    );

    return confirmStep;
  }

  private topUpAccountNextStep(
    operationInfo: IOperationInfo,
    account: string,
    amount: number,
  ): Observable<IOperationInfo> {
    const stepParamAccount = operationInfo.stepParams.find(
      (param) => param.identifier === 'Account',
    );

    if (!stepParamAccount)
      return throwError(
        new HttpErrorResponse({
          error: 'Не нашелся идентификатор операции',
          status: 400,
        }),
      );

    const value = stepParamAccount.values.find((value) =>
      value.includes(account),
    );

    if (!value)
      return throwError(
        new HttpErrorResponse({
          error: 'Не нашелся счет пользователя',
          status: 400,
        }),
      );

    const payload: IStepParam[] = [
      {
        identifier: 'Account',
        value: value,
      },
      {
        identifier: 'Amount',
        value: amount.toString(),
      },
    ];

    return this._http
      .patch<IOperationInfo>(
        `/api/operations?requestId=${operationInfo.requestId}`,
        payload,
      )
      .pipe(catchError((error) => this.handleError(error, operationInfo)));
  }

  private topUpAccountConfirmStep(
    operationInfo: IOperationInfo,
  ): Observable<IOperationInfo> {
    return this._http
      .post<IOperationInfo>(
        `/api/operations?requestId=${operationInfo.requestId}`,
        null,
      )
      .pipe(catchError((error) => this.handleError(error, operationInfo)));
  }

  private handleError(
    error: HttpErrorResponse,
    operationInfo: IOperationInfo,
  ): Observable<never> {
    return this._http
      .delete(`/api/operations?requestId=${operationInfo.requestId}`)
      .pipe(
        mergeMap(() => throwError(error)),
        catchError((err) => throwError(err)),
      );
  }
}
