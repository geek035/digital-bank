import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthorizationService } from 'src/app/core/services/authorization-service/authorization.service';
import { loginValidator } from 'src/app/core/validators/logging.validator';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoggingComponent implements OnDestroy {
  public formGroup: FormGroup = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required, loginValidator()],
      updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
  });

  public showSpinner = new BehaviorSubject(false);
  private _subscription: Subscription | null = null;

  constructor(
    private readonly _authorizationService: AuthorizationService,
    private readonly _snackBar: MatSnackBar,
    private readonly _router: Router,
  ) {}

  onSubmit() {
    if (this.formGroup.valid) {
      this._subscription && this._subscription.unsubscribe();
      this.showSpinner.next(true);

      const login = this._username.value;
      const password = this._password.value;

      this._subscription = this._authorizationService
        .authorizate(login, password)
        .subscribe({
          next: (response) => {
            this.showSpinner.next(false);
            this._router.navigate(['/user-home']);
          },
          error: (err: HttpErrorResponse) => {
            this.showSpinner.next(false);
            this._snackBar.open(`Ошибка авторизации. ${err.error}`, 'ок');
          },
        });
    }
  }

  ngOnDestroy() {
    this._subscription && this._subscription.unsubscribe();
  }

  onRegistrationClick() {
    this._router.navigate(['/registration']);
  }

  onRecoverPasswordClick() {
    this._router.navigate(['/recover-password']);
  }

  get _username(): AbstractControl {
    return this.formGroup.get('username') as AbstractControl;
  }

  get _password(): AbstractControl {
    return this.formGroup.get('password') as AbstractControl;
  }
}
