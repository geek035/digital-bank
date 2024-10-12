import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/core/services/authorization-service/authorization.service';
import { loginValidator } from 'src/app/core/validators/logging.validator';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoggingComponent implements OnInit {
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

  public showSpinner = false;

  constructor(
    private readonly _authorizationService: AuthorizationService,
    private readonly _snackBar: MatSnackBar,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.formGroup.valid) {
      this.showSpinner = true;
      this._changeDetectorRef.markForCheck();
      this._authorizationService.authorizate('s', 's').subscribe({
        next: (response) => {
          this.showSpinner = false;

          /* 
            Добавить редирект в личный кабинет;
          */

          this._changeDetectorRef.markForCheck();
        },
        error: (err) => {
          this.showSpinner = false;
          this._changeDetectorRef.markForCheck();
          this.openSnackBar(
            'Ошибка авторизации. Пользователь не зарегистрирован',
            'ок'
          );
        },
      });
    }
  }

  onRegistrationClick() {
    this._router.navigate(['/registration']);
  }

  onRecoverPasswordClick() {
    this._router.navigate(['/recover-password']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  get _username(): AbstractControl {
    return this.formGroup.get('username') as AbstractControl;
  }

  get _password(): AbstractControl {
    return this.formGroup.get('password') as AbstractControl;
  }
}
