import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-registration',
  templateUrl: './dialog-registration.component.html',
  styleUrls: ['./dialog-registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogRegistrationComponent {
  constructor(private readonly _router: Router) {}

  onEnterClick() {
    this._router.navigate(['/logging']);
  }

  onCancelClick() {
    this._router.navigate(['/home']);
  }
}
