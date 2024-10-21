import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { CurrencyService } from '../../../services/currency/currency.service';
import { TransactionsService } from '../../../services/transactions/transactions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { IAccountModel } from 'src/app/interfaces/mybank/account-model.interace';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IOperationInfo } from 'src/app/interfaces/operations/operation-info.interface';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { amountTrasferValidator } from 'src/app/core/validators/amount-transfer.validator';

export interface IRefillOperationForm {
  account: string,
  amount: string,
}

@Component({
  selector: 'app-refill-operation',
  templateUrl: './refill-operation.component.html',
  styleUrls: ['./refill-operation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefillOperationComponent implements OnChanges, OnDestroy {
  constructor(
    private readonly _currencyService: CurrencyService,
    private readonly _transactionsService: TransactionsService,
    private readonly _snackBar: MatSnackBar,
  ) {}

  @Input() account: IAccountModel | null = null;
  @ViewChild('stepper') stepper!: MatStepper;

  private subcription: Subscription | null = null;

  public operationInfo$ = new BehaviorSubject({} as IOperationInfo);
  public showSpinner$ = new BehaviorSubject(false);
  public inputData$ = new BehaviorSubject({} as IRefillOperationForm);

  public refillOperationForm = new FormGroup({
    account: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d+/g),
    ]),
    amount: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d+/g),
      amountTrasferValidator(),
    ]),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (this.account) {
      this._account.setValue(this.account.number);
    }
  }

  ngOnDestroy(): void {
    this.subcription && this.subcription.unsubscribe();
  }

  onNextStepClick() {
    this.inputData$.next(this.refillOperationForm.value);
  }

  onConfirmOperationClick() {
    this.subcription && this.subcription.unsubscribe();
    this.showSpinner$.next(true);

    const accountValue = this._account.value;
    const amountValue = this._amount.value;

    this.subcription = this._transactionsService.refillAccount(accountValue, amountValue).subscribe({
      next: (operationInfo) => {
        this.showSpinner$.next(false);
        this.operationInfo$.next(operationInfo);
      },
      error: (error) => {
        this.showSpinner$.next(false);
        this._snackBar.open(error.error, 'ок');
        this.stepper && this.stepper.reset();
      }
    });
  }

  onCloseClick() {
    this.stepper && this.stepper.reset();
  }

  getCurrencyIcon(): string {
    return this._currencyService.getCurrencyIcon(this.account?.currency ?? 0);
  }

  get _account(): AbstractControl {
    return this.refillOperationForm.get('account') as AbstractControl;
  }

  get _amount(): AbstractControl {
    return this.refillOperationForm.get('amount') as AbstractControl;
  }

}
