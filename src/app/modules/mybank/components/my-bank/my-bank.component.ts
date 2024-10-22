import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/core/services/user-data-service/user-data.service';
import { CardService } from '../../services/card-service/card.service';
import { ICardModel } from '../../interfaces/card-model.interface';
import { MatDialog } from '@angular/material/dialog';
import { CardComponent } from '../products/card/card.component';
import { IAccountModel } from 'src/app/interfaces/mybank/account-model.interace';
import { AccountService } from '../../services/account-service/account.service';

@Component({
  selector: 'app-my-bank',
  templateUrl: './my-bank.component.html',
  styleUrls: ['./my-bank.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBankComponent {
  constructor(
    private readonly _userDataService: UserDataService,
    private readonly _router: Router,
    private readonly _cardService: CardService,
    private readonly _accountService: AccountService,
    private readonly _dialog: MatDialog,
  ) {}

  public userFullName$ = this._userDataService.getFullName();
  public userCards$ = this._cardService.getCards();
  public userAccounts$ = this._accountService.getAccounts();

  onRedirectClick(event: Event) {
    const dataInfo = (event.currentTarget as HTMLElement).dataset?.['btn'];

    switch (dataInfo) {
      case 'card-register':
        this._router.navigate(['/user-home/card-register']);
        break;

      case 'account-register':
        this._router.navigate(['/user-home/account-register']);
        break;

      case 'personal-account':
        this._router.navigate(['/user-home/personal-account']);
        break;
    }
  }

  redirectToAccountPage(account: IAccountModel) {
    this._router.navigate(['/user-home/account'], {
      queryParams: { accountId: account.id },
    });
  }

  public trackCardByFn(index: number, card: ICardModel): number {
    return card.id;
  }

  public trackAccountByFn(index: number, account: IAccountModel): number {
    return account.id;
  }

  showExpandedCard(card: ICardModel) {
    this._dialog.open(CardComponent, {
      data: {
        card: card,
        viewMode: 'expanded',
      },
    });
  }
}
