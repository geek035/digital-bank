import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/core/services/authorization-service/authorization.service';
import { UserDataService } from 'src/app/core/services/user-data-service/user-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  public title = 'Дебетовая карта от К-Банка';
  public isAuthorizated = this._authorizationService.isAuthorized();
  public userFirstName$ = this._userDataService.getFirstName();

  constructor(
    private readonly _router: Router,
    private readonly _userDataService: UserDataService,
    private readonly _authorizationService: AuthorizationService,
  ) {}

  onMainButtonClick() {
    if (this.isAuthorizated) {
      this._router.navigate(['/user-home/my-bank']);
    } else {
      this._router.navigate(['/logging']);
    }
  }

  onRedirectClick(event: Event) {
    const dataInfo = (event.currentTarget as HTMLElement).dataset?.['btn'];

    switch (dataInfo) {
      case 'enter':
        this._router.navigate(['/logging']);
        break;

      case 'register':
        this._router.navigate(['/registration']);
        break;

      case 'user-home':
        this._router.navigate(['/user-home']);
        break;
    }
  }
}
