import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RecoverPasswordService } from '../../services/recover-password/recover-password.service';

@Injectable({
  providedIn: 'root',
})
export class RecoverPasswordGuard
  implements CanActivate, CanDeactivate<unknown>
{
  constructor(
    private readonly _recoverPasswordService: RecoverPasswordService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isPasswordReset = this._recoverPasswordService.passwordReset;

    if (isPasswordReset) {
      window.alert('Вы еще не завершили восстановление пароля');
    }
    return !isPasswordReset;
  }
}
