import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardRegisterOperationService } from '../../services/card-register-operation/card-register-operation.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-register',
  templateUrl: './card-register.component.html',
  styleUrls: ['./card-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardRegisterComponent {
  constructor(
    private readonly _cardRegisterOperationService: CardRegisterOperationService,
    private readonly _router: Router,
    private readonly _snackBar: MatSnackBar,
  ) {}

  public showSpinner$ = new BehaviorSubject(false);

  onRedirectClick(event: Event) {
    const dataInfo = (event.currentTarget as HTMLElement).dataset?.['btn'];

    if (dataInfo == 'credit') {
      this.showSpinner$.next(true);
      this._cardRegisterOperationService.validateUser().subscribe({
        next: (response) => {
          this.showSpinner$.next(false);

          response
            ? this._router.navigate(['/user-home/card-register-operation'], {
                queryParams: [dataInfo],
              })
            : this._snackBar.open('Заказ кредитной карты недоступен', 'ок');
        },
      });
    } else {
      this._router.navigate(['/user-home/card-register-operation'], {
        queryParams: [dataInfo],
      });
    }
  }
}
