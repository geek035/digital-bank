import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AccountService } from '../../services/account-service/account.service';
import { IAccountModel } from 'src/app/interfaces/mybank/account-model.interace';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { CurrencyService } from '../../services/currency/currency.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountPageComponent implements OnInit, OnDestroy {
  constructor(
    private _accountService: AccountService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _snackBar: MatSnackBar,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _currencyService: CurrencyService,
  ) { }
  
  public account: IAccountModel | null = null;
  public showSpinner$ = new BehaviorSubject(false);


  private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.showSpinner$.next(true);
    
    const accountId = this._activatedRoute.snapshot.queryParams['accountId'];

    this.subscription = this._accountService.getAccount(accountId).subscribe({
      next: (account) => { 
        this.showSpinner$.next(false);
        this.account = account;
        this._changeDetectorRef.detectChanges();
       },
       error: (error: HttpErrorResponse) => {
        this.showSpinner$.next(false);
        this._snackBar.open(error.error, 'ок');
        this._router.navigate(['user-home/my-bank']);
       }
    });
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  changeAccountState() {
    this.subscription && this.subscription.unsubscribe();
    this.showSpinner$.next(true);

    let operation;
    if (this.account?.state === 'Active') {
      operation = this._accountService.lockAccount(this.account.id); 
    } else if (this.account?.state === 'Blocked') {
      operation = this._accountService.unlockAccount(this.account.id);
    } else return;

    this.subscription = operation.subscribe({
      next: (account) => {
        this.showSpinner$.next(false);
        this._snackBar.open('Состояние счета обновлено', 'ок');
        this.account = account;
        this._changeDetectorRef.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        this.showSpinner$.next(false);
        this._snackBar.open(error.error, 'ок');
      }
    });
  }

  getCurrencyIcon() {
    return this._currencyService.getCurrencyIcon(this.account?.currency ?? 0);
  }

  getAccountState() {
    switch (this.account?.state) {
      case 'Active':
        return 'активен';

      case 'Blocked':
        return 'заблокирован';

      case 'Created':
        return 'не активен';

      default:
        return 'неизвестное состояние'
    }
  }

  getButtonStateText() {
    switch (this.account?.state) {
      case 'Active':
        return 'Заблокировать';

      case 'Blocked':
        return 'Разблокировать';

      case 'Created':
        return 'Активировать';

      default:
        return 'Недоступно'
    }
  }

}
