import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { AccountService } from '../../services/account-service/account.service';
import { IAccountModel } from 'src/app/interfaces/mybank/account-model.interace';
import { BehaviorSubject, of, Subscription, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatExpansionPanel } from '@angular/material/expansion';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPageComponent implements OnDestroy {
  constructor(
    private _accountService: AccountService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _snackBar: MatSnackBar,
  ) {}

  @ViewChild('refillAccountPanel') refillPanel!: MatExpansionPanel;
  @ViewChild('transferAccountPanel') transferPanel!: MatExpansionPanel;

  public account: IAccountModel | null = null;
  public showSpinner$ = new BehaviorSubject(false);
  public reloadData$ = new BehaviorSubject<IAccountModel | null>(null);
  public getAccount$ = this.reloadData$.pipe(
    switchMap((account) => {
      if (account) {
        this.account = account;
        return of(account);
      }

      return this._accountService.getAccount(this.getAccountId()).pipe(
        tap((account) => {
          this.account = account;
        }),
        catchError((error: HttpErrorResponse) => {
          this._snackBar.open(error.error, 'ок');
          this._router.navigate(['user-home/my-bank']);
          return throwError(error);
        }),
      );
    }),
  );

  private subscription: Subscription | null = null;

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  onRefillAcoountClick() {
    this.refillPanel && this.refillPanel.toggle();
  }

  onTransferAccountClick() {
    this.transferPanel && this.transferPanel.toggle();
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
        this.reloadData$.next(account);
      },
      error: (error: HttpErrorResponse) => {
        this.showSpinner$.next(false);
        this._snackBar.open(error.error, 'ок');
      },
    });
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
        return 'Недоступно';
    }
  }

  private getAccountId() {
    return this._activatedRoute.snapshot.queryParams['accountId'];
  }
}
