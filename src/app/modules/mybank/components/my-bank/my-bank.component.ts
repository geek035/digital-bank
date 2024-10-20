import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/core/services/user-data-service/user-data.service';
import { CardService } from '../../services/card-service/card.service';
import { Observable } from 'rxjs';
import { ICardModel } from '../../interfaces/card-model.interface';
import { MatDialog } from '@angular/material/dialog';
import { CardComponent } from '../products/card/card.component';

@Component({
  selector: 'app-my-bank',
  templateUrl: './my-bank.component.html',
  styleUrls: ['./my-bank.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBankComponent implements OnInit {
  constructor(
    private readonly _userDataService: UserDataService,
    private readonly _router: Router,
    private readonly _cardService: CardService,
    private readonly _dialog: MatDialog,
  ) {}

  public userFullName$ = this._userDataService.getFullName();
  public userCards$!: Observable<ICardModel[]>;

  ngOnInit(): void {
    this.userCards$ = this._cardService.getCards();
  }

  onRedirectClick(event: Event) {
    const dataInfo = (event.currentTarget as HTMLElement).dataset?.['btn'];

    switch (dataInfo) {
      case 'card-register':
        this._router.navigate(['/user-home/card-register']);
        break;
      
      case 'account-register':
        this._router.navigate(['/user-home/account-register']);
        break;
    }
  }

  public trackCardByFn(index: number, card: ICardModel): number {
    return card.id;
  }

  showExpandedCard(card: ICardModel) {
    this._dialog.open(CardComponent, {
      data: {
        card: card,
        viewMode: 'expanded'
      },
    })
  }
}
