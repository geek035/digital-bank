import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ShowcaseService } from 'src/app/core/services/showcase-service/showcase.service';

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountRegisterComponent {
  constructor(
    private readonly _showcaseService: ShowcaseService,
    private readonly _router: Router,
  ) {}

  public showSpinner$ = new BehaviorSubject(false);
  public currentAccount$ = this._showcaseService.getProductInfo(1);
  public savingsAccount$ = this._showcaseService.getProductInfo(2);

  onRedirectClick(event: Event) {
    const dataInfo = (event.currentTarget as HTMLElement).dataset?.['btn'];

    if (dataInfo === 'current') {
      this._router.navigate(['/user-home/account-register-operation'], {
        queryParams: { accountType: dataInfo },
      });
    } else if (dataInfo === 'savings') {
      this._router.navigate(['/user-home/account-register-operation'], {
        queryParams: { accountType: dataInfo },
      });
    }
  }
}
