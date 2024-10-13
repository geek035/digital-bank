import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-registration',
  templateUrl: './dialog-registration.component.html',
  styleUrls: ['./dialog-registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogRegistrationComponent implements OnInit {

  constructor(
    private readonly _router: Router,
  ) { }

  ngOnInit(): void {
  }

  onEnterClick() {
    this._router.navigate(['/logging']);
  }

  onCancelClick() {
    this._router.navigate(['/home']);
  }

}
