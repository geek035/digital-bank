import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../../services/authorization-service/authorization.service';

@Injectable({
  providedIn: 'root',
})
export class MyBankGuard implements CanActivate {
  constructor(
    private readonly _authorizationService: AuthorizationService,
    private readonly _router: Router,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._authorizationService.isAuthorized();
  }
}
