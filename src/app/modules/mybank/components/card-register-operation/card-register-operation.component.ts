import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserDataService } from 'src/app/core/services/user-data-service/user-data.service';
import { fullNameValidator } from 'src/app/core/validators/full-name.validator';
import { ICardRegisterOperation } from '../../interfaces/card-register-operation.interface';
import { CardRegisterOperationService } from '../../services/card-register-operation/card-register-operation.service';
import {
  CardProductValue,
  CardProgramTypeValue,
} from 'src/app/interfaces/operations/step-param.inteface';
import { IOperationInfo } from 'src/app/interfaces/operations/operation-info.interface';

@Component({
  selector: 'app-card-register-operation',
  templateUrl: './card-register-operation.component.html',
  styleUrls: ['./card-register-operation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardRegisterOperationComponent
  implements AfterViewInit, OnDestroy
{
  public cardProductForm = new FormGroup({
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
    cardProduct: new FormControl('', [Validators.required]),
  });
  public releaseProductForm = new FormGroup({
    releaseType: new FormControl('', [Validators.required]),
  });

  private subscription: Subscription | null = null;
  private cardProduct: CardProductValue | null = null;
  private programType: CardProgramTypeValue | null = null;

  public inputData$ = new BehaviorSubject({} as ICardRegisterOperation);
  public showSpinner$ = new BehaviorSubject(false);
  public operationInfo$ = new BehaviorSubject({} as IOperationInfo);

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _userDataService: UserDataService,
    private readonly _snackBar: MatSnackBar,
    private readonly _cardRegisterOperationService: CardRegisterOperationService,
  ) {}

  ngAfterViewInit(): void {
    this.showSpinner$.next(true);

    const cardType = this._activatedRoute.snapshot.queryParams['cardType'];
    this.setCardProductValue(cardType);

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

  public onNextStepClick() {
    const inputData: ICardRegisterOperation = {
      lastName: this._lastName?.value ?? '',
      firstName: this._firstName?.value ?? '',
      middleName: this._middleName?.value ?? '',
      birthdate:
        (this._birthdate?.value as Date).toLocaleDateString('ru-RU', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }) ?? '',
      cardProduct: this._cardProduct?.value ?? '',
      releaseType: this._releaseType?.value ?? '',
    };

    this.inputData$.next(inputData);
  }

  public completeOperation() {
    this.subscription && this.subscription.unsubscribe();
    this.showSpinner$.next(true);

    this.programType = this._releaseType.value as CardProgramTypeValue;
  
    this.subscription = this._cardRegisterOperationService
      .orderCard(this.cardProduct as CardProductValue, this.programType)
      .subscribe({
        next: (operationInfo) => {
          this.showSpinner$.next(false);
          this.operationInfo$.next(operationInfo);
        },
        error: (err: HttpErrorResponse) => {
          this.showSpinner$.next(false);
          this._snackBar.open(err.error, 'ок');
          this._router.navigate(['/user-home/card-register']);
        },
      });
  }

  public onFinishOperationClick() {
    this._router.navigate(['/user-home/my-bank']);
  }

  private setCardProductValue(cardType: string) {
    switch (cardType) {
      case 'credit':
        this.cardProduct = 'Кредитная карта';
        break;
      case 'debit':
        this.cardProduct = 'Дебетовая карта'
        break;
    }

    this._cardProduct.setValue(this.cardProduct);
  }

  get _lastName(): AbstractControl {
    return this.cardProductForm.get('lastName') as AbstractControl;
  }

  get _firstName(): AbstractControl {
    return this.cardProductForm.get('firstName') as AbstractControl;
  }

  get _middleName(): AbstractControl {
    return this.cardProductForm.get('middleName') as AbstractControl;
  }

  get _birthdate(): AbstractControl {
    return this.cardProductForm.get('birthdate') as AbstractControl;
  }

  get _cardProduct(): AbstractControl {
    return this.cardProductForm.get('cardProduct') as AbstractControl;
  }

  get _releaseType(): AbstractControl {
    return this.releaseProductForm.get('releaseType') as AbstractControl;
  }
}
