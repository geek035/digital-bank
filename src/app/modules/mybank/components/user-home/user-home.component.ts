import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/core/services/authorization-service/authorization.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserHomeComponent {
  constructor(
    private readonly _router: Router,
    private readonly _authorizationService: AuthorizationService,
  ) {}

  onRedirectClick(event: Event) {
    const dataInfo = (event.currentTarget as HTMLElement).dataset?.['btn'];

    switch (dataInfo) {
      case 'my-bank':
        this._router.navigate(['/user-home/my-bank']);
        break;

      case 'logout':
        this._authorizationService.logOut();
        this._router.navigate(['home-page']);
        break;

      case 'personal-account':
        this._router.navigate(['/user-home/personal-account']);
        break;
    }
  }
}
