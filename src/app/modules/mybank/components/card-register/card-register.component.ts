import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CardRegisterOperationService } from '../../services/card-register-operation/card-register-operation.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShowcaseService } from 'src/app/core/services/showcase-service/showcase.service';
import { IProductModel } from 'src/app/interfaces/mybank/product-model.interface';

@Component({
  selector: 'app-card-register',
  templateUrl: './card-register.component.html',
  styleUrls: ['./card-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardRegisterComponent implements OnInit, OnDestroy {
  constructor(
    private readonly _cardRegisterOperationService: CardRegisterOperationService,
    private readonly _router: Router,
    private readonly _snackBar: MatSnackBar,
    private readonly _showcaseService: ShowcaseService
  ) {}

  public showSpinner$ = new BehaviorSubject(false);
  public debitCardInfo$!: Observable<IProductModel>;
  public creditCardInfo$!: Observable<IProductModel>;
  
  private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.debitCardInfo$ = this.getProductInfo(3);
    this.creditCardInfo$ = this.getProductInfo(4);
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  onRedirectClick(event: Event) {
    const dataInfo = (event.currentTarget as HTMLElement).dataset?.['btn'];

    if (dataInfo == 'credit') {
      this.subscription && this.subscription.unsubscribe();

      this.showSpinner$.next(true);
      this.subscription = this._cardRegisterOperationService.validateUser().subscribe({
        next: (response) => {
          this.showSpinner$.next(false);

          response
            ? this._router.navigate(['/user-home/card-register-operation'], {
                queryParams: { cardType: dataInfo },
              })
            : this._snackBar.open('Заказ кредитной карты недоступен', 'ок');
        },
      });
    } else if (dataInfo == 'virtual') {
      this._snackBar.open('Продукт пока не доступен. Ждите обновлений', 'ок');
    } else {
      this._router.navigate(['/user-home/card-register-operation'], {
        queryParams: { cardType: dataInfo },
      });
    }
  }

  private getProductInfo(productId: number): Observable<IProductModel> {
    return this._showcaseService.getProductInfo(productId);
  }
}
