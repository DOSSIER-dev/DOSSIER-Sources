import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../core/auth.service';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent implements OnInit {
  currentUser: User = new User();
  loggedIn = false;
  isManager = false;
  version = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Fetch user status
    // Is this the right place here to init this?
    this.authService.updateCurrentUser();

    const currentUser$ = this.authService.currentStatus$;

    currentUser$.subscribe(status => {
      // Update auth status
      this.loggedIn = status.auth;
      this.isManager = status.user && status.user.isManager;

      // Update current user
      if (status.user) {
        this.currentUser = status.user;
      } else {
        this.currentUser = new User();
      }
    });

    this.version = environment.version || '';
  }

  signOut() {
    this.authService.signOut().subscribe(_ => {
      this.router.navigateByUrl('/');
    });
  }
}
