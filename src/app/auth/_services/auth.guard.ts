import { Injectable }                                                        from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable }                                                        from 'rxjs';
import { JwtState }                                                          from 'src/app/auth/login/state/login'
import { StorageService }                                                    from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private storageService: StorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!!this.storageService.getJwt()) {
      return true
    } else JwtState.actReLogin.emit()
  }
}
