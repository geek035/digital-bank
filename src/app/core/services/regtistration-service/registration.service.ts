import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IRegistrationForm } from 'src/app/interfaces/authorization/registration-form';
import { IRegistrationRequest } from 'src/app/interfaces/authorization/registration-request';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private readonly http: HttpClient) {}

  registerNewUser(userData: IRegistrationForm): Observable<string> {
    const payload = this.converToRequestType(userData);
    return this.http.put('/api/clients', payload)
      .pipe(switchMap(response => of('registered new user')));
  }

  private converToRequestType(userData: IRegistrationForm): IRegistrationRequest {
    return {
      login: userData.login.toLowerCase(),
      email: userData.email,
      lastName: userData.lastName,
      firstName: userData.firstName,
      middleName: userData.middleName,
      sex: userData.sex,
      birthdate: new Date(userData.birthdate).toISOString(),
      phoneNumber: /\+7.*/.test(userData.phoneNumber)
        ? userData.phoneNumber : '7' + userData.phoneNumber,
      address: userData.address,
      password: userData.password,
    }
  }
}
