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
import { Router } from '@angular/router';
import { emailValidator } from 'src/app/core/validators/email.validator';
import { fullNameValidator } from 'src/app/core/validators/full-name.validator';
import { passwordValidator } from 'src/app/core/validators/password.validator';
import { telephoneValidator } from 'src/app/core/validators/telephone.validator';
import { usernameValidator } from 'src/app/core/validators/username.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  public formGroup = new FormGroup({
    telephone: new FormControl('', {
      validators: [Validators.required, telephoneValidator()],
      updateOn: 'blur',
    }),
    username: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        usernameValidator(),
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
    secondName: new FormControl('', {
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
    birthday: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    gender: new FormControl('', {
      validators: [Validators.required],
    }),
    address: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(100),
      ],
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

  public showSpinner = false;
  public passwordVisible = false;

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _router: Router,
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this._password.value !== this._repeatedPassword.value) {
      this._repeatedPassword.setErrors({noMatchPasswords: true })
    }
  }

  onCancelClick() {
    this._router.navigate(['/home']);
  }

  showPasswordSymbols() {
    this.passwordVisible = !this.passwordVisible;
  }

  get _telephone(): AbstractControl {
    return this.formGroup.get('telephone') as AbstractControl;
  }

  get _username(): AbstractControl {
    return this.formGroup.get('username') as AbstractControl;
  }

  get _email(): AbstractControl {
    return this.formGroup.get('email') as AbstractControl;
  }

  get _firstName(): AbstractControl {
    return this.formGroup.get('firstName') as AbstractControl;
  }

  get _secondName(): AbstractControl {
    return this.formGroup.get('secondName') as AbstractControl;
  }

  get _middleName(): AbstractControl {
    return this.formGroup.get('middleName') as AbstractControl;
  }

  get _birthday(): AbstractControl {
    return this.formGroup.get('birthday') as AbstractControl;
  }

  get _address(): AbstractControl {
    return this.formGroup.get('address') as AbstractControl;
  }

  get _gender(): AbstractControl {
    return this.formGroup.get('gender') as AbstractControl;
  }

  get _password(): AbstractControl {
    return this.formGroup.get('password') as AbstractControl;
  }

  get _repeatedPassword(): AbstractControl {
    return this.formGroup.get('repeatedPassword') as AbstractControl;
  }
}
