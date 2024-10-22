import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IAccountModel } from 'src/app/interfaces/mybank/account-model.interace';
import { CurrencyService } from '../../../services/currency/currency.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {
  constructor(
    private readonly _currencyService: CurrencyService
  ) { }

  @Input() account!: IAccountModel;

  ngOnInit(): void {
  }

  getAccountClass() {
    if (this.account.name == 'Текущий счёт') {
      return 'current-account'
    } else if (this.account.name.includes('Карточный счёт')) {
      return 'card-account'
    }

    return 'savings-account'
  }

  getCurrencyIcon() {
    return this._currencyService.getCurrencyIcon(this.account.currency);
  }
}
