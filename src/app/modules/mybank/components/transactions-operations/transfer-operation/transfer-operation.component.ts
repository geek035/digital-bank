import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { amountTrasferValidator } from 'src/app/core/validators/amount-transfer.validator';
import { IAccountModel } from 'src/app/interfaces/mybank/account-model.interace';
import { TransactionsService } from '../../../services/transactions/transactions.service';
import { IOperationInfo } from 'src/app/interfaces/operations/operation-info.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { HttpErrorResponse } from '@angular/common/http';

export interface ITransferOperationForm {
  sourceAccount: string;
  reciverAccount: string;
  amount: number;
  comment: string;
}

@Component({
  selector: 'app-transfer-operation',
  templateUrl: './transfer-operation.component.html',
  styleUrls: ['./transfer-operation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferOperationComponent implements OnChanges, OnDestroy {
  constructor(
    private readonly _transactionsService: TransactionsService,
    private readonly _snackBar: MatSnackBar,
  ) {}
  @Input() account: IAccountModel | null = null;
  @ViewChild('stepper') stepper!: MatStepper;

  private subcription: Subscription | null = null;

  public operationInfo$ = new BehaviorSubject({} as IOperationInfo);
  public showSpinner$ = new BehaviorSubject(false);
  public inputData$ = new BehaviorSubject({} as ITransferOperationForm);

  public transferOperationForm = new FormGroup({
    sourceAccount: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d+/g),
    ]),
    reciverAccount: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d+/g),
    ]),
    amount: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d+/g),
      amountTrasferValidator(),
    ]),
    comment: new FormControl('', []),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (this.account) {
      this._sourceAccount.setValue(this.account.number);
    }
  }

  ngOnDestroy(): void {
    this.subcription && this.subcription.unsubscribe();
  }

  onNextStepClick() {
    this.inputData$.next(this.transferOperationForm.value);
  }

  onCloseClick() {
    this.stepper && this.stepper.reset();
  }

  onConfirmOperationClick() {
    this.subcription && this.subcription.unsubscribe();
    this.showSpinner$.next(true);

    this.subcription = this._transactionsService
      .transferAccount(this.transferOperationForm.value)
      .subscribe({
        next: (operationInfo) => {
          this.showSpinner$.next(false);
          this.operationInfo$.next(operationInfo);
        },
        error: (error: HttpErrorResponse) => {
          this.showSpinner$.next(false);
          this._snackBar.open(error.error, 'ок');
          this.stepper && this.stepper.reset();
        },
      });
  }

  get _sourceAccount(): AbstractControl {
    return this.transferOperationForm.get('sourceAccount') as AbstractControl;
  }

  get _reciverAccount(): AbstractControl {
    return this.transferOperationForm.get('reciverAccount') as AbstractControl;
  }

  get _amount(): AbstractControl {
    return this.transferOperationForm.get('amount') as AbstractControl;
  }
}
