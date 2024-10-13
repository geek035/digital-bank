import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { RecoverPasswordService } from 'src/app/core/services/recover-password/recover-password.service';
import { loginValidator } from 'src/app/core/validators/logging.validator';
import { passwordValidator } from 'src/app/core/validators/password.validator';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecoverPasswordComponent implements OnInit {
  constructor(
    private readonly _recoverPasswordService: RecoverPasswordService,
    private readonly _snackBar: MatSnackBar,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _router: Router,
  ) {}

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  public loginControl = new FormControl('', {
    validators: [Validators.required, loginValidator()],
    updateOn: 'blur',
  });
  public codeControl = new FormControl('', {
    validators: [
      Validators.required,
      Validators.maxLength(4),
      Validators.pattern(/^[0-9]+$/g),
    ],
    updateOn: 'blur',
  });
  public passwordFormGroup = new FormGroup({
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
  })

  public activeTab = 0;
  public showSpinner = false;
  public passwordVisible = false;
  private smsCode: number | null = null;

  ngOnInit(): void {}

  getCode() {
    this.showSpinner = true;
    this._changeDetectorRef.markForCheck();
    const login = this.loginControl.value;
    this._recoverPasswordService.recoverPassword(login).subscribe({
      next: (_) => {
        this.showSpinner = false;
        this.loginControl.disable();
        this.activeTab = 1;
        this._changeDetectorRef.markForCheck();
        this.smsCode = Math.floor(1000 + Math.random() * 9000);
        this._snackBar.open(`Код подтверждения: ${this.smsCode}`, 'ок');
      },
      error: (_) => {
        this.showSpinner = false;
        this._changeDetectorRef.markForCheck();
        this.loginControl.setErrors({ unknownUser: true });
      },
    });
  }

  refreshCode() {
    this.smsCode = Math.floor(1000 + Math.random() * 9000);
    this._snackBar.open(`Код подтверждения: ${this.smsCode}`, 'ок');
  }

  sendCode() {
    const code = this.codeControl.value;
    if (this.smsCode !== Number(code)) {
      this.codeControl.setErrors({ wrongCode: true });
    } else {
      this.activeTab = 2;
      this._changeDetectorRef.markForCheck();
    }
  }

  onRestorePasswordCLick() {
    if (this._password.value !== this._repeatedPassword.value) {
      this._repeatedPassword.setErrors({ noMatchPasswords: true });
    } else {
      this.showSpinner = true;
      this._changeDetectorRef.markForCheck();
      const password = this._password.value;
      this._recoverPasswordService.updatePassword(this.loginControl.value, password).subscribe({
        next: (_) => {
          this.showSpinner = false;
          this._changeDetectorRef.markForCheck();
          this._router.navigate(['/logging']);
        },
        error: (err) => {
          this.showSpinner = false;
          this._changeDetectorRef.markForCheck();
          this._snackBar.open(err, 'ок');
        } 
      })
    }
  }

  showPasswordSymbols() {
    this.passwordVisible = !this.passwordVisible;
  }

  get _password(): AbstractControl {
    return this.passwordFormGroup.get('password') as AbstractControl;
  }

  get _repeatedPassword(): AbstractControl {
    return this.passwordFormGroup.get('repeatedPassword') as AbstractControl;
  }
}
