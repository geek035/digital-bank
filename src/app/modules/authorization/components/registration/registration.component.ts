import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/core/services/regtistration-service/registration.service';
import { emailValidator } from 'src/app/core/validators/email.validator';
import { fullNameValidator } from 'src/app/core/validators/full-name.validator';
import { passwordValidator } from 'src/app/core/validators/password.validator';
import { loginValidator } from 'src/app/core/validators/login.validator';
import { phoneNumberValidator } from 'src/app/core/validators/phoneNumber.validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogRegistrationComponent } from '../dialog-registration/dialog-registration.component';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnDestroy {
  public formGroup = new FormGroup({
    phoneNumber: new FormControl('', {
      validators: [Validators.required, phoneNumberValidator()],
      updateOn: 'blur',
    }),
    login: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        loginValidator(),
      ],
      updateOn: 'blur',
    }),
    email: new FormControl('', {
      validators: [Validators.required, emailValidator()],
      updateOn: 'blur',
    }),
    firstName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        fullNameValidator(),
      ],
      updateOn: 'blur',
    }),
    lastName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        fullNameValidator(),
      ],
      updateOn: 'blur',
    }),
    middleName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        fullNameValidator(),
      ],
      updateOn: 'blur',
    }),
    birthdate: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    sex: new FormControl('', {
      validators: [Validators.required],
    }),
    address: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(100)],
      updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(30),
        passwordValidator(),
      ],
      updateOn: 'blur',
    }),
    repeatedPassword: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
  });

  public showSpinner = new BehaviorSubject(false);
  public passwordVisible = false;
  private _subscription: Subscription | null = null;

  constructor(
    private readonly _router: Router,
    private readonly _registrationService: RegistrationService,
    private readonly _snackBar: MatSnackBar,
    private readonly _dialog: MatDialog
  ) {}

  onSubmit() {
    if (!this._sex.value) {
      this._snackBar.open('Выберите пол', 'ok');
    } else if (this._password.value !== this._repeatedPassword.value) {
      this._repeatedPassword.setErrors({ noMatchPasswords: true });
    } else if (this.formGroup.valid) {
      this.showSpinner.next(true);

      const payload = this.formGroup.value;

      this._subscription = this._registrationService
        .registerNewUser(payload)
        .subscribe({
          next: (_) => {
            this.showSpinner.next(false);
            this._dialog.open(DialogRegistrationComponent);
          },
          error: (err: HttpErrorResponse) => {
            this.showSpinner.next(false);
            this._login.setErrors({ existingUser: true });
            this._snackBar.open(err.error, 'ок');
          },
        });
    }
  }

  ngOnDestroy() {
    this._subscription && this._subscription.unsubscribe();
  }

  onCancelClick() {
    this._router.navigate(['/home']);
  }

  showPasswordSymbols() {
    this.passwordVisible = !this.passwordVisible;
  }

  get _phoneNumber(): AbstractControl {
    return this.formGroup.get('phoneNumber') as AbstractControl;
  }

  get _login(): AbstractControl {
    return this.formGroup.get('login') as AbstractControl;
  }

  get _email(): AbstractControl {
    return this.formGroup.get('email') as AbstractControl;
  }

  get _firstName(): AbstractControl {
    return this.formGroup.get('firstName') as AbstractControl;
  }

  get _lastName(): AbstractControl {
    return this.formGroup.get('lastName') as AbstractControl;
  }

  get _middleName(): AbstractControl {
    return this.formGroup.get('middleName') as AbstractControl;
  }

  get _birthdate(): AbstractControl {
    return this.formGroup.get('birthdate') as AbstractControl;
  }

  get _address(): AbstractControl {
    return this.formGroup.get('address') as AbstractControl;
  }

  get _sex(): AbstractControl {
    return this.formGroup.get('sex') as AbstractControl;
  }

  get _password(): AbstractControl {
    return this.formGroup.get('password') as AbstractControl;
  }

  get _repeatedPassword(): AbstractControl {
    return this.formGroup.get('repeatedPassword') as AbstractControl;
  }
}
