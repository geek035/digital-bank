import { HttpErrorResponse } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, of, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserDataService } from 'src/app/core/services/user-data-service/user-data.service';
import { ICardOrderModel } from '../../interfaces/card-order-model.interface';
import { ITransactionModel } from 'src/app/interfaces/operations/transaction-model.interface';

@Component({
  selector: 'app-operations-list',
  templateUrl: './operations-list.component.html',
  styleUrls: ['./operations-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperationsListComponent implements AfterViewInit {
  constructor(
    private readonly _userDataService: UserDataService,
    private readonly _snackBar: MatSnackBar,
    private readonly _router: Router,
  ) { }
  
  public cardsOpertionsLength = 0;
  public cardsOperationsCurrentPage = 0;
  public cardsOperationsPageSize = 2;
  
  public accountsOpertionsLength = 0;
  public accountsOperationsCurrentPage = 0;
  public accountsOperationsPageSize = 2;

  public showCardsOperationListSpinner$ = new BehaviorSubject(false);
  public showAccountsOperationListSpinner$ = new BehaviorSubject(false);

  public reloadCardsOperations$ = new Subject<void>();
  public cardsOperationsList$ = this.reloadCardsOperations$.pipe(
    switchMap(() => {
      this.showCardsOperationListSpinner$.next(true);
      return this._userDataService.getUserCardSOperations().pipe(
        switchMap((cardsOperationsList) => {
          this.cardsOpertionsLength = cardsOperationsList.length;
          const startIndex = this.cardsOperationsCurrentPage * this.cardsOperationsPageSize;
          const endIndex = startIndex + this.cardsOperationsPageSize;
          return of(cardsOperationsList.slice(startIndex, endIndex))
        }),
        catchError((error:HttpErrorResponse) => {
          this.showCardsOperationListSpinner$.next(false);
          this._snackBar.open(error.error, 'ок');
          this._router.navigate(['/user-home/personal-account']);
          return throwError(error);
        }),
        switchMap((result) => {
          this.showCardsOperationListSpinner$.next(false);
          return of(result);
        })
        
      );
    })
  )

  public reloadAccountsOperations$ = new Subject<void>();
  public accountsOperationsList$ = this.reloadAccountsOperations$.pipe(
    switchMap(() => {
      this.showAccountsOperationListSpinner$.next(true);
      return this._userDataService.getUserAccountsOperations().pipe(
        switchMap((accountsOperationsList) => {
          this.accountsOpertionsLength = accountsOperationsList.length;
          const startIndex = this.accountsOperationsCurrentPage * this.accountsOperationsPageSize;
          const endIndex = startIndex + this.cardsOperationsPageSize;
          return of(accountsOperationsList.slice(startIndex, endIndex))
        }),
        catchError((error:HttpErrorResponse) => {
          this.showAccountsOperationListSpinner$.next(false);
          this._snackBar.open(error.error, 'ок');
          this._router.navigate(['/user-home/personal-account']);
          return throwError(error);
        }),
        switchMap((result) => {
          this.showAccountsOperationListSpinner$.next(false);
          return of(result);
        })
        
      );
    })
  )

  ngAfterViewInit(): void {
    this.reloadCardsOperations$.next();
    this.reloadAccountsOperations$.next();
  }

  public getProgramTypeLogo(cardOperation: ICardOrderModel): string {
    const assetsName =
      (cardOperation.cardProgram === 'МИР' && 'mir.svg') ||
      (cardOperation.cardProgram === 'Maestro' && 'maestro.svg') ||
      (cardOperation.cardProgram == 'Visa' && 'visa.svg') ||
      (cardOperation.cardProgram === 'Mastercard' && 'master card.svg');

    return `/assets/${assetsName}`;
  }

  public getTypeAccountOperation(accountOperation: ITransactionModel) {
    switch (accountOperation.type) {
      case 'Expense':
        return 'перевод';
      
      case 'Income':
        return 'пополнение';

      case 'Active':
        return 'открыт'

      default:
        return 'неизвестный тип';
    }
  }

  cardsListTrackByFn(index: number, cardOperation: ICardOrderModel) {
    return cardOperation.requestId;
  }

  accountsListTrackByFn(index: number, accountOperation: ITransactionModel) {
    return accountOperation.id;
  }

  onCardsOperationListPageChange(event: PageEvent) {
    this.cardsOperationsCurrentPage = event.pageIndex; 
    this.cardsOperationsPageSize = event.pageSize;
    this.reloadCardsOperations$.next();
  }

  onAccountsOperationListPageChange(event: PageEvent) {
    this.accountsOperationsCurrentPage = event.pageIndex; 
    this.accountsOperationsPageSize = event.pageSize;
    this.reloadAccountsOperations$.next();
  }

}
