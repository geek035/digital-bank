import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { IUserData } from 'src/app/interfaces/mybank/user-data.interface';
import { IUserFullName } from 'src/app/interfaces/mybank/user-full-name';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private readonly _http: HttpClient) {}

  getFirstName(): Observable<string> {
    return this._http.get<IUserData>('/api/clients').pipe(
      switchMap((res) => of(res.firstName)),
      catchError((err) => throwError(err))
    );
  }

  getFullName(): Observable<IUserFullName> {
    return this._http.get<IUserData>('/api/clients').pipe(
      switchMap((res) => {
        const userFullName: IUserFullName = {
          firstName: res.firstName,
          middleName: res.middleName,
          lastName: res.lastName,
        }

        return of(userFullName);
      }),
      catchError((err) => throwError(err))
    )
  }

  getUserData(): Observable<IUserData> {
    return this._http.get<IUserData>('/api/clients').pipe(
      switchMap((res) => of(res)),
      catchError((err) => throwError(err))
    );
  }
}
