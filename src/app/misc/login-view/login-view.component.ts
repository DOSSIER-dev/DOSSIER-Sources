import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { UserService, AuthTokenResponse } from '../../core/user.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  usernameInput: FormControl = new FormControl();
  passwordInput: FormControl = new FormControl();
  message = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.message = '';
    this.userService
      .auth(this.usernameInput.value, this.passwordInput.value)
      .pipe(
        finalize(() => {
          this.authService.updateCurrentUser();
        })
      )
      .subscribe(
        (tokenResponse: AuthTokenResponse) => {
          this.router.navigateByUrl('/');
        },
        err => {
          this.message =
            'Could not authenticate - ' +
            (err.status === 400 ? 'Wrong username/password combination' : 'Unknown error');
        }
      );
  }
}
