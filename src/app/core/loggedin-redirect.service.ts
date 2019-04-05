import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

/**
 * Route guard for routes that feature a different component for a
 * logged in user - functions as an "upgrade" of a route in case of
 * authenticated state.
 */
@Injectable({
  providedIn: 'root'
})
export class LoggedinRedirectService implements CanActivate {
  // Which routes to upgrade
  routeUpgrades = [{ from: '/', to: '/dashboard' }];

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const upgradableRoute = this.routeUpgrades.find(r => r.from === state.url);

    if (!!upgradableRoute) {
      if (this.authService.isAuth()) {
        // Redirect
        this.router.navigate([upgradableRoute.to]);
        return of(false);
      } else {
        // Set as redirect target, in case an auth change happens in the future
        this.authService.setRedirectUrl(upgradableRoute.to);
      }
    }

    // Proceed with the route normally
    return of(true);
  }
}
