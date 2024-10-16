import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorizationService } from 'src/app/core/services/authorization-service/authorization.service';
import { UserDataService } from 'src/app/core/services/user-data-service/user-data.service';
import { IUserData } from 'src/app/interfaces/mybank/user-data.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  public title = 'Дебетовая карта от К-Банка';
  public isAuthorizated = this._authorizationService.isAuthorized();
  public userFirstName$ = this._userDataService.getFirstName();
  private subscription: Subscription | null = null;

  constructor(
    private readonly _router: Router,
    private readonly _userDataService: UserDataService,
    private readonly _authorizationService: AuthorizationService,
  ) { }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
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
      
      case 'mybank':
        this._router.navigate(['/mybank']);
        break;
    }
  }
}
