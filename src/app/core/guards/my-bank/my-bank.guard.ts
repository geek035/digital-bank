import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../../services/authorization-service/authorization.service';

@Injectable({
  providedIn: 'root',
})
export class MyBankGuard implements CanActivate {
  constructor(private readonly _authorizationService: AuthorizationService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    console.log(this._authorizationService.isAuthorized());
    return this._authorizationService.isAuthorized();
  }
}
