import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserDataService } from 'src/app/core/services/user-data-service/user-data.service';
import { fullNameValidator } from 'src/app/core/validators/full-name.validator';
import { IAccountRegisterOperation } from '../../interfaces/account-register-operation.interface';
import { AccountRegisterService } from '../../services/account-register-service/account-register.service';
import { AccountCurrency, AccountType } from 'src/app/interfaces/operations/step-param.inteface';
import { IOperationInfo } from 'src/app/interfaces/operations/operation-info.interface';

@Component({
  selector: 'app-account-register-operation',
  templateUrl: './account-register-operation.component.html',
  styleUrls: ['./account-register-operation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountRegisterOperationComponent
  implements AfterViewInit, OnDestroy
{
  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _userDataService: UserDataService,
    private readonly _snackBar: MatSnackBar,
    private readonly _accountRegisterOperationService: AccountRegisterService,
  ) {}

  private subscription: Subscription | null = null;
  
  public operationInfo$ = new BehaviorSubject({} as IOperationInfo);
  public showSpinner$ = new BehaviorSubject(false);
  public inputData$ = new BehaviorSubject({} as IAccountRegisterOperation);

  public accountProductForm = new FormGroup({
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
      fullNameValidator(),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      fullNameValidator(),
    ]),
    middleName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
      fullNameValidator(),
    ]),
    birthdate: new FormControl('', [Validators.required]),
    accountType: new FormControl('', [Validators.required]),
    accountCurrency: new FormControl('', [Validators.required]),
  });


  ngAfterViewInit(): void {
    this.showSpinner$.next(true);

    const accountType = this._activatedRoute.snapshot.queryParams['accountType'];
    this._accountType.setValue(this.getAccountType(accountType));

    this.subscription = this._userDataService.getUserData().subscribe({
      next: (userData) => {
        this.showSpinner$.next(false);
        this._lastName.setValue(userData.lastName);
        this._firstName.setValue(userData.firstName);
        this._middleName.setValue(userData.middleName);
        this._birthdate.setValue(new Date(userData.birthdate));
      },
      error: (err: HttpErrorResponse) => {
        this.showSpinner$.next(false);
        this._snackBar.open(err.error, 'ок');
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  public onCancelClick() {
    this._router.navigate(['/user-home/card-register']);
  }

  public onNextStepClick() {
    const inputData: IAccountRegisterOperation = {
      lastName: this._lastName?.value ?? '',
      firstName: this._firstName?.value ?? '',
      middleName: this._middleName?.value ?? '',
      birthdate:
        (this._birthdate?.value as Date).toLocaleDateString('ru-RU', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }) ?? '',
      accountType: this._accountType?.value ?? '',
      accountCurrency: this._accountCurrency?.value ?? '',
    };

    this.inputData$.next(inputData);
  }

  public onFinishOperationClick() {
    this._router.navigate(['/user-home/my-bank']);
  }

  public completeOperation() {
    this.subscription && this.subscription.unsubscribe();
    this.showSpinner$.next(true);
    
    const accountType = this._accountType.value as AccountType;
    const accountCurrency = this._accountCurrency.value as AccountCurrency;

    this.subscription = this._accountRegisterOperationService
    .openAccount(accountType, accountCurrency)
      .subscribe({
        next: (operationInfo) => {
          this.showSpinner$.next(false);
          this.operationInfo$.next(operationInfo as IOperationInfo);
        },
        error: (err: HttpErrorResponse) => {
          this.showSpinner$.next(false);
          this._snackBar.open(err.error, 'ок');
          this._router.navigate(['/user-home/card-register']);
        },
      });
  }

  private getAccountType(accountTypeParam: string): string {
    switch (accountTypeParam) {
      case 'current':
        return 'Текущий счёт';
      
      case 'savings':
        return 'Накопительный счёт';

      default:
        return 'Неизвестный тип счета';
    }
  }
 
  get _lastName(): AbstractControl {
    return this.accountProductForm.get('lastName') as AbstractControl;
  }

  get _firstName(): AbstractControl {
    return this.accountProductForm.get('firstName') as AbstractControl;
  }

  get _middleName(): AbstractControl {
    return this.accountProductForm.get('middleName') as AbstractControl;
  }

  get _birthdate(): AbstractControl {
    return this.accountProductForm.get('birthdate') as AbstractControl;
  }

  get _accountType(): AbstractControl {
    return this.accountProductForm.get('accountType') as AbstractControl;
  }

  get _accountCurrency(): AbstractControl {
    return this.accountProductForm.get('accountCurrency') as AbstractControl;
  }
}
