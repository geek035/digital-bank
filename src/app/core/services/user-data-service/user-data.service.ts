import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { IUserData } from 'src/app/interfaces/mybank/user-data.interface';
import { IUserFullName } from 'src/app/interfaces/mybank/user-full-name';
import { ITransactionModel } from 'src/app/interfaces/operations/transaction-model.interface';
import { ICardOrderModel } from 'src/app/modules/mybank/interfaces/card-order-model.interface';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private readonly _http: HttpClient) {}

  getFirstName(): Observable<string> {
    return this._http.get<IUserData>('/api/clients').pipe(
      switchMap((res) => of(res.firstName)),
      catchError((err) => throwError(err))
    );
  }

  updateUserData(userData: IUserData): Observable<null> {
    return this._http.patch<null>('/api/clients', userData).pipe(
      switchMap((response) => of(response)),
      catchError((error) => throwError(error))
    );
  }

  getFullName(): Observable<IUserFullName> {
    return this._http.get<IUserData>('/api/clients').pipe(
      switchMap((res) => {
        const userFullName: IUserFullName = {
          firstName: res.firstName,
          middleName: res.middleName,
          lastName: res.lastName,
        }

        return of(userFullName);
      }),
      catchError((err) => throwError(err))
    )
  }

  getUserData(): Observable<IUserData> {
    return this._http.get<IUserData>('/api/clients').pipe(
      switchMap((res) => of(res)),
      catchError((err) => throwError(err))
    );
  }

  getUserCardSOperations(): Observable<ICardOrderModel[]> {
    return this._http.get<ICardOrderModel[]>('/api/cards/orders').pipe(
      switchMap((cardsOrders) => of(cardsOrders)),
      catchError((error) => throwError(error))
    );
  }

  getUserAccountsOperations(): Observable<ITransactionModel[]> {
    return this._http.get<ITransactionModel[]>('/api/transactions').pipe(
      switchMap((transactionsList) => of(transactionsList)),
      catchError((error) => of(error))
    );
  }
}
