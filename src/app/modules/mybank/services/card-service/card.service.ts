import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ICardModel } from '../../interfaces/card-model.interface';
import { catchError, switchMap } from 'rxjs/operators';
import { ICardOrderModel } from '../../interfaces/card-order-model.interface';
import { IAccountModel } from '../../../../interfaces/mybank/account-model.interace';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private readonly _http: HttpClient) {}

  getCards(): Observable<ICardModel[]> {
    return this._http.get<ICardModel[]>('/api/cards').pipe(
      switchMap((cards) => of(cards)),
      catchError((error: HttpErrorResponse) => throwError(error)),
    );
  }

  getCardCVC(cardId: number): Observable<number> {
    return this._http.get<number>(`/api/cards/${cardId}/cvc`).pipe(
      switchMap((cards) => of(cards)),
      catchError((error: HttpErrorResponse) => throwError(error)),
    );
  }

  getCardsOrder(): Observable<ICardOrderModel[]> {
    return this._http.get<ICardOrderModel[]>('/api/cards/orders').pipe(
      switchMap((cardsOrders) => of(cardsOrders)),
      catchError((error: HttpErrorResponse) => throwError(error)),
    );
  }

  activateCard(cardId: number, pinCode: number): Observable<IAccountModel> {
    const payload = { pinCode: pinCode };

    return this._http
      .patch<IAccountModel>(`/api/cards/activate/${cardId}`, payload)
      .pipe(
        switchMap((accountModel) => of(accountModel)),
        catchError((error: HttpErrorResponse) => throwError(error)),
      );
  }

  blockCard(cardId: number): Observable<IAccountModel> {
    return this._http
      .patch<IAccountModel>(`/api/cards/lock/${cardId}`, null)
      .pipe(
        switchMap((accountModel) => of(accountModel)),
        catchError((error: HttpErrorResponse) => throwError(error)),
      );
  }

  unlockCard(cardId: number): Observable<ICardModel> {
    return this._http
      .patch<ICardModel>(`/api/cards/unlock/${cardId}`, null)
      .pipe(
        switchMap((cardModel) => of(cardModel)),
        catchError((error: HttpErrorResponse) => throwError(error)),
      );
  }
}
