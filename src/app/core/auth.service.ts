import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { UserService, AuthTokenResponse, BackendUser } from './user.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { share, map, catchError } from 'rxjs/operators';

export class User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  isManager: boolean;
}

export class LoginStatus {
  constructor(public auth = false, public user: User = null) {}
}

/**
 * AuthService
 *
 * This services issues the login / logout requests to the backend API.

 * But also performs redirects with the router on login status state
 * changes.
 */
@Injectable()
export class AuthService {
  token: string;
  isAuthenticated = false;
  redirectUrl: ActivatedRouteSnapshot | string;
  currentStatus$: BehaviorSubject<LoginStatus> = new BehaviorSubject(new LoginStatus());

  constructor(private userService: UserService, private router: Router) {
    this.currentStatus$.subscribe(status => {
      this.isAuthenticated = status.auth;
      if (status.auth && this.hasRedirect()) {
        this.performRedirect();
      }
    });
  }

  getCurrentUser(): User | null {
    const loginStatus = this.currentStatus$.getValue();
    if (loginStatus.auth) {
      return loginStatus.user;
    }
    return null;
  }

  signalLogout() {
    this.currentStatus$.next(new LoginStatus(false, null));
  }

  /**
   * Updates the currentStatus$ subject, which is the site-wide user status.
   */
  updateCurrentUser(): Observable<User> {
    const sharedRequest = this.userService.fetchUser().pipe(
      map(this._transformBackendUser),
      share()
    );

    sharedRequest
      .pipe(
        map(user => new LoginStatus(true, user)),
        catchError(_ => of(new LoginStatus(false, null)))
      )
      .subscribe(status => {
        this.currentStatus$.next(status);
      });

    return sharedRequest;
  }

  signOut(): Observable<AuthTokenResponse> {
    const req = this.userService.logout().pipe(share());
    req.subscribe(
      () => {},
      () => {},
      () => {
        // Destroy the session, no matter what the result form the
        // backend is.
        this.isAuthenticated = false;
        this.signalLogout();
      }
    );
    return req;
  }

  isAuth() {
    return this.isAuthenticated;
  }

  setRedirectUrl(url: ActivatedRouteSnapshot | string) {
    this.redirectUrl = url;
  }

  hasRedirect() {
    return !!this.redirectUrl;
  }

  performRedirect() {
    if ((<ActivatedRouteSnapshot>this.redirectUrl).url) {
      const redirectRoute = <ActivatedRouteSnapshot>this.redirectUrl;
      const urlParts = redirectRoute.url.map(v => v.path);
      this.router.navigate(urlParts, {
        queryParams: redirectRoute.queryParams
      });
    } else {
      const url = <string>this.redirectUrl;
      this.router.navigate([url]);
    }

    // Reset the redirect
    this.redirectUrl = null;
  }

  _getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      const cookie = cookies
        .map(v => v.trim())
        .find(v => v.substring(0, name.length + 1) === name + '=');

      if (cookie) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return cookieValue;
  }

  getCsrfToken() {
    return this._getCookie('csrftoken');
  }

  private _transformBackendUser(userResult: BackendUser): User {
    const user = new User();
    return Object.assign(user, {
      firstname: userResult.first_name,
      lastname: userResult.last_name,
      username: userResult.username,
      id: userResult.pk,
      email: userResult.email,
      isManager: userResult.isManager
    });
  }
}
