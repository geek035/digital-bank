import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/core/services/user-data-service/user-data.service';

@Component({
  selector: 'app-my-bank',
  templateUrl: './my-bank.component.html',
  styleUrls: ['./my-bank.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBankComponent implements OnDestroy {
  constructor(
    private readonly _userDataService: UserDataService,
    private readonly _router: Router,
  ) {}

  public userFullName$ = this._userDataService.getFullName();

  ngOnDestroy(): void {}

  onRedirectClick(event: Event) {
    const dataInfo = (event.currentTarget as HTMLElement).dataset?.['btn'];

    switch (dataInfo) {
      case 'card-register':
        this._router.navigate(['/user-home/card-register']);
        break;
    }
  }
}
