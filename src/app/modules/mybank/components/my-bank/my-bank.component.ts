import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UserDataService } from 'src/app/core/services/user-data-service/user-data.service';

@Component({
  selector: 'app-my-bank',
  templateUrl: './my-bank.component.html',
  styleUrls: ['./my-bank.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBankComponent implements OnDestroy {
  constructor(private readonly _userDataService: UserDataService) {}

  public userFullName$ = this._userDataService.getFullName();

  ngOnDestroy(): void {}
}
