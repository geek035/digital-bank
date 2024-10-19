import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserDataService } from 'src/app/core/services/user-data-service/user-data.service';
import { IUserData } from 'src/app/interfaces/mybank/user-data.interface';

@Injectable({
  providedIn: 'root',
})
export class CardRegisterOperationService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _userDataService: UserDataService,
  ) {}

  validateUser(): Observable<boolean> {
    return this._userDataService.getUserData().pipe(
      switchMap((response) => {
        return of(this.checkUserData(response));
      }),
      catchError((err) => throwError(err)),
    );
  }

  private checkUserData(data: IUserData): boolean {
    const age = this.getUserAge(data.birthdate);
    return (
      (data.sex === 'Male' && 18 <= age && age <= 60) ||
      (data.sex === 'Female' && 30 <= age && age <= 50)
    );
  }

  private getUserAge(birthdate: string): number {
    const date = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - date.getFullYear();
    const monthDifference = today.getMonth() - date.getMonth();
    const dayDifference = today.getDate() - date.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  }
}
