import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserDataService } from 'src/app/core/services/user-data-service/user-data.service';
import { IUserData } from 'src/app/interfaces/mybank/user-data.interface';

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalAccountComponent implements OnInit, OnDestroy {
  constructor(
    private readonly _userDataService: UserDataService,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _snackBar: MatSnackBar,
    private readonly _router: Router,
  ) { }
  
  public showSpinner$ = new BehaviorSubject(false);
  public userData: IUserData | null = null;
  private subscription: Subscription | null = null;


  ngOnInit(): void {
    this.showSpinner$.next(true);

    this.subscription = this._userDataService.getUserData().subscribe({
      next: (userData) => {
        this.showSpinner$.next(false);
        this.userData = userData;
        this._changeDetectorRef.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        this.showSpinner$.next(false);
        this._snackBar.open(error.error, 'ок');
        this._router.navigate(['/home-page']);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

}
