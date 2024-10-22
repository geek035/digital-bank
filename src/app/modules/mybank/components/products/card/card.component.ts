import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  Inject,
  Optional,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ICardModel } from '../../../interfaces/card-model.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { CardService } from '../../../services/card-service/card.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, concatMap, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrencyService } from '../../../services/currency/currency.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit, OnDestroy {
  constructor(
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: { card: ICardModel; viewMode: 'simple' | 'expanded' },
    private readonly _cardServce: CardService,
    private readonly fb: FormBuilder,
    private readonly _snackBak: MatSnackBar,
    private readonly _currencyService: CurrencyService,
  ) {
    if (data) {
      this.card = data.card;
      this.viewMode = data.viewMode;
    }

    this.pinCodeForm = this.fb.group({
      digit1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit4: ['', [Validators.required, Validators.pattern('[0-9]')]],
    });
  }

  @ViewChild('pinCodeBlock') pinCodeBlock!: ElementRef;
  public pinCodeForm: FormGroup;

  @Input() card!: ICardModel;
  @Input() viewMode: 'simple' | 'expanded' = 'simple';

  public isHiddenNumber = true;
  public isHiddenCVC = true;
  public cardType!: string;
  public cardCVC$!: Observable<number>;

  private subscription: Subscription | null = null;

  ngOnInit(): void {
    if (this.card) {
      this.cardType = this.card.product.name;
    }
    this.cardCVC$ = this._cardServce.getCardCVC(this.card.id);
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  public getProgramTypeLogo(): string {
    const assetsName =
      (this.card.cardProgram === 'МИР' && 'mir.svg') ||
      (this.card.cardProgram === 'Maestro' && 'maestro.svg') ||
      (this.card.cardProgram == 'Visa' && 'visa.svg') ||
      (this.card.cardProgram === 'Mastercard' && 'master card.svg');

    return `/assets/${assetsName}`;
  }

  getCurrencyIcon() {
    return this._currencyService.getCurrencyIcon(this.card.account.currency);
  }

  public toggleCardNumber() {
    this.isHiddenNumber = !this.isHiddenNumber;
  }

  public toggleCodeCVC() {
    this.isHiddenCVC = !this.isHiddenCVC;
  }

  public updateCardState() {
    this.subscription && this.subscription.unsubscribe();

    switch (this.card.state) {
      case 'Created':
        this.pinCodeBlock &&
          (this.pinCodeBlock.nativeElement as HTMLElement).classList.toggle(
            'pin-code-block_view',
          );

        break;

      case 'Active':
        this.subscription = this._cardServce.blockCard(this.card.id).subscribe({
          next: () => {
            window.location.reload();
          },
          error: (err: HttpErrorResponse) => {
            this._snackBak.open(err.message, 'ок');
            (this.pinCodeBlock.nativeElement as HTMLElement).classList.toggle(
              'pin-code-block_view',
            );
          },
        });
        break;

      case 'Locked':
        this.subscription = this._cardServce.unlockCard(this.card.id).subscribe({
          next: () => {
            window.location.reload();
          },
          error: (err: HttpErrorResponse) => {
            this._snackBak.open(err.message, 'ок');
            (this.pinCodeBlock.nativeElement as HTMLElement).classList.toggle(
              'pin-code-block_view',
            );
          },
        })
    }
  }

  public returnButtonText(): string {
    switch (this.card.state) {
      case 'Created':
        return 'Активировать карту';

      case 'Active':
        return 'Заблокировать карту';

      case 'Locked':
        return 'Разблокировать карту';

      default:
        return 'Неизвестное состояние карты';
    }
  }

  public setPinCode() {
    this.subscription && this.subscription.unsubscribe();

    const pinCode = +Object.values(this.pinCodeForm.value).join('');

    this.subscription = this._cardServce
      .activateCard(this.card.id, pinCode)
      .subscribe({
        next: () => {
          window.location.reload();
        },
        error: (err: HttpErrorResponse) => {
          this._snackBak.open(err.error, 'ок');
          (this.pinCodeBlock.nativeElement as HTMLElement).classList.toggle(
            'pin-code-block_view',
          );
        },
      });
  }

  public moveFocus(
    currentInput: HTMLInputElement,
    nextInput: HTMLInputElement,
  ) {
    nextInput.focus();
  }

  public getCardState(): string {
    switch (this.card.state) {
      case 'Created':
        return 'Карта создана';

      case 'Active':
        return 'Карта активна';

      case 'Locked':
        return 'Карта заблокирована';

      default:
        return 'Неизвестное состояние карты';
    }
  }

  public getCardClass(): string {
    if (this.cardType == 'Дебетовая карта') return 'debit-card';

    return 'credit-card';
  }

  public getCardTermClass(): string {
    if (this.cardType == 'Дебетовая карта') return 'debit-card__term';

    return 'credit-card__term';
  }

  public getCardNumberClass(): string {
    if (this.cardType == 'Дебетовая карта') return 'debit-card__number';

    return 'credit-card__number';
  }
}
