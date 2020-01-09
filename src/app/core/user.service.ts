import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class AuthTokenResponse {
  key: string;
}

export class BackendUser {
  pk: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  isManager: boolean;
}

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  auth(username: string, password: string): Observable<AuthTokenResponse> {
    const req = this.httpClient.post<AuthTokenResponse>('/api/rest-auth/login/', {
      username: username,
      password: password
    });
    return req;
  }

  logout(): Observable<AuthTokenResponse> {
    const req = this.httpClient.post<AuthTokenResponse>('/api/rest-auth/logout/', {});
    return req;
  }

  /**
   * Fetch current (session) user
   */
  fetchUser() {
    return this.httpClient.get<BackendUser>('/api/rest-auth/user/');
  }

  setPassword(oldPassword: string, newPassword1: string, newPassword2: string) {
    return this.httpClient.post('/api/rest-auth/password/change/', {
      old_password: oldPassword,
      new_password1: newPassword1,
      new_password2: newPassword2
    });
  }

  /**
   * Set personal data of user (and username).
   */
  setPersonalData(firstname: string, lastname: string) {
    return this.httpClient.patch('/api/rest-auth/user/', {
      first_name: firstname,
      last_name: lastname
    });
  }

  resetPassword(email: string) {
    return this.httpClient.post('/api/rest-auth/password/reset/', {
      email: email
    });
  }

  resetPasswordConfirm(uid: string, token: string, newPassword1: string, newPassword2: string) {
    return this.httpClient.post('/api/rest-auth/password/reset/confirm/', {
      uid: uid,
      token: token,
      new_password1: newPassword1,
      new_password2: newPassword2
    });
  }
}
