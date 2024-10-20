import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { UserDataService } from 'src/app/core/services/user-data-service/user-data.service';
import { IUserData } from 'src/app/interfaces/mybank/user-data.interface';
import { IOperationInfo } from 'src/app/interfaces/operations/operation-info.interface';
import { IStartOperation } from 'src/app/interfaces/operations/start-operation.interface';
import {
  CardProductValue,
  CardProgramTypeValue,
  IStepParam,
} from 'src/app/interfaces/operations/step-param.inteface';

@Injectable({
  providedIn: 'root',
})
export class CardRegisterOperationService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _userDataService: UserDataService,
  ) {}

  validateUser(): Observable<boolean> {
    return this._userDataService.getUserData().pipe(
      switchMap((response) => {
        return of(this.checkUserData(response));
      }),
      catchError((err) => throwError(err)),
    );
  }

  orderCard(
    product: CardProductValue,
    programType: CardProgramTypeValue,
  ): Observable<IOperationInfo> {
    const payload: IStartOperation = { operationCode: 'CardOrder' };

    return this._http.put<IOperationInfo>('/api/operations', payload).pipe(
      switchMap((firstStepInfo) =>
        this.continueOperation(firstStepInfo, product, programType).pipe(
          mergeMap((middleStepInfo) =>
            this.confirmOperation(middleStepInfo).pipe(
              mergeMap((lastStepEinfo) => of(lastStepEinfo)),
              catchError((middleStepError) =>
                this.handleError(middleStepError, middleStepInfo).pipe(
                  mergeMap(() => throwError(middleStepError)))
              ),
            ),
          ),
          catchError((firstStepError) =>
            this.handleError(firstStepError, firstStepInfo).pipe(
              mergeMap(() => throwError(firstStepError)))
          ),
        ),
      ),
      catchError((err) => throwError(err)),
    );
  }

  private handleError(
    err: HttpErrorResponse,
    operationInfo: IOperationInfo,
  ): Observable<never> {
    const requestId = operationInfo.requestId.toString();
    return this._http.delete<null>(`/api/operations?requestId=${requestId}`).pipe(
      mergeMap(() => throwError(err)),
      catchError(() => throwError(err)),
    );
  }

  private continueOperation(
    operationInfo: IOperationInfo,
    product: CardProductValue,
    programType: CardProgramTypeValue,
  ): Observable<IOperationInfo> {
    const requestId = operationInfo.requestId.toString();
    const payload: IStepParam[] = [
      {
        identifier: "Product",
        value: product,
      },
      {
        identifier: "ProgramType",
        value: programType,
      }
    ];

    return this._http.patch<IOperationInfo>(
      `/api/operations?requestId=${requestId}`,
      payload,
    );
  }

  private confirmOperation(
    operationInfo: IOperationInfo,
  ): Observable<IOperationInfo> {
    const requestId = operationInfo.requestId.toString();

    return this._http.post<IOperationInfo>(
      `/api/operations?requestId=${requestId}`,
      null,
    );
  }

  private checkUserData(data: IUserData): boolean {
    const age = this.getUserAge(data.birthdate);
    return (
      (data.sex === 'Male' && 18 <= age && age <= 60) ||
      (data.sex === 'Female' && 30 <= age && age <= 50)
    );
  }

  private getUserAge(birthdate: string): number {
    const date = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - date.getFullYear();
    const monthDifference = today.getMonth() - date.getMonth();
    const dayDifference = today.getDate() - date.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  }
}
