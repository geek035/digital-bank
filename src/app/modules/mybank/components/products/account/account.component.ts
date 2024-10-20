import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IAccountModel } from 'src/app/interfaces/mybank/account-model.interace';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {
  constructor() { }

  @Input() account!: IAccountModel;

  ngOnInit(): void {
  }

  getAccountClass() {
    if (this.account.name == 'Текущий счёт') {
      return 'current-account'
    }

    return 'savings-account'
  }

  getCurrencyIcon() {
    switch (this.account.currency) {
      case 643:
        return 'currency_ruble';

      default:
        return 'currency_ruble';
    }
  }

}
