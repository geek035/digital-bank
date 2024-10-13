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

      const login = this._username.value;
      const password = this._password.value; 

      this._authorizationService.authorizate(login, password).subscribe({
        next: (response) => {
          this.showSpinner = false;
          this._changeDetectorRef.markForCheck();
          
          this._router.navigate(['/mybank']);
        },
        error: (err) => {
          this.showSpinner = false;
          this._changeDetectorRef.markForCheck();
          this._snackBar.open(
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

  get _username(): AbstractControl {
    return this.formGroup.get('username') as AbstractControl;
  }

  get _password(): AbstractControl {
    return this.formGroup.get('password') as AbstractControl;
  }
}
