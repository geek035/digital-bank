import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { UserDataService } from 'src/app/core/services/user-data-service/user-data.service';
import { emailValidator } from 'src/app/core/validators/email.validator';
import { fullNameValidator } from 'src/app/core/validators/full-name.validator';
import { loginValidator } from 'src/app/core/validators/logging.validator';
import { phoneNumberValidator } from 'src/app/core/validators/phoneNumber.validator';
import { IUserData } from 'src/app/interfaces/mybank/user-data.interface';

@Component({
  selector: 'app-update-user-data',
  templateUrl: './update-user-data.component.html',
  styleUrls: ['./update-user-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateUserDataComponent implements OnDestroy {
  constructor(
    private readonly _router: Router,
    private readonly _snackBar: MatSnackBar,
    private readonly _userDataService: UserDataService,
  ) { }

  public showSpinner$ = new BehaviorSubject(false);
  public showLoadingDataSpinner$ = new BehaviorSubject(false);
  public inputData$ = new BehaviorSubject<IUserData | null>(null);
  public userData$ = new BehaviorSubject<IUserData | null>(null).pipe(
    tap(() => { this.showLoadingDataSpinner$.next(true); }),
    switchMap(() => this._userDataService.getUserData().pipe(
      tap((userData) => {
        this.fillControls(userData)
      }),
      catchError((error: HttpErrorResponse) => {
        this._snackBar.open(error.error, 'ок');
        this._router.navigate(['/home-page']);
        return throwError(error);
      })
    )),
    tap(() => { this.showLoadingDataSpinner$.next(false); })
  );


  private subscription: Subscription | null = null;

  public userUpdateDataForm = new FormGroup({
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
  });

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  onSubmit() {
    const userData = this.userUpdateDataForm.value;
    userData['isMustChangePassword'] = false;

    userData.phoneNumber = '+7' + userData.phoneNumber;
    this.inputData$.next(userData);
  }

  completeOperation() {
    this.subscription && this.subscription.unsubscribe();
    this.showSpinner$.next(true);

    const userData = this.userUpdateDataForm.value;
    userData['isMustChangePassword'] = false;

    this.subscription = this._userDataService.updateUserData(userData).subscribe({
      next: () => {
        this.showSpinner$.next(false);
        this._snackBar.open('Данные обновлены', 'ок');
        this._router.navigate(['/user-home/personal-account']);
      },
      error: (error: HttpErrorResponse) => {
        this.showSpinner$.next(false);
        this._snackBar.open(error.error, 'ок');
        this._router.navigate(['/user-home/personal-account']);
      }
    })
  }

  onCancelClick() {
    this._router.navigate(['/user-home/personal-account']);
  }


  private fillControls(user: IUserData) {
      const phone = user.phoneNumber.replace(/\+\d/g, "");
      this._phoneNumber.setValue(phone);
      this._login.setValue(user.login);
      this._email.setValue(user.email);
      this._firstName.setValue(user.firstName);
      this._lastName.setValue(user.lastName);
      this._middleName.setValue(user.middleName);
      this._birthdate.setValue(new Date(user.birthdate));
      this._address.setValue(user.address);
      this._sex.setValue(user.sex);
  }

  get _phoneNumber(): AbstractControl {
    return this.userUpdateDataForm.get('phoneNumber') as AbstractControl;
  }

  get _login(): AbstractControl {
    return this.userUpdateDataForm.get('login') as AbstractControl;
  }

  get _email(): AbstractControl {
    return this.userUpdateDataForm.get('email') as AbstractControl;
  }

  get _firstName(): AbstractControl {
    return this.userUpdateDataForm.get('firstName') as AbstractControl;
  }

  get _lastName(): AbstractControl {
    return this.userUpdateDataForm.get('lastName') as AbstractControl;
  }

  get _middleName(): AbstractControl {
    return this.userUpdateDataForm.get('middleName') as AbstractControl;
  }

  get _birthdate(): AbstractControl {
    return this.userUpdateDataForm.get('birthdate') as AbstractControl;
  }

  get _address(): AbstractControl {
    return this.userUpdateDataForm.get('address') as AbstractControl;
  }

  get _sex(): AbstractControl {
    return this.userUpdateDataForm.get('sex') as AbstractControl;
  }

}
