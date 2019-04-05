import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

/**
 * Route guard for routes that require logged in user.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.authService.isAuth()) {
      return of(true);
    }

    // TODO :
    //    solution : evaluate the the auth state
    //    before any actual routing takes place (to prevent the redirects) -
    //    e.g. in a parent route, which contains all sub-routes (at least all
    //    that have to do with auth-status ?)

    this.authService.setRedirectUrl(route);
    this.router.navigate(['/login']);
    return of(false);
  }
}
