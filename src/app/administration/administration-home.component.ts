import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-administration-home',
  template: `
    <section class="column-level-2 srcs-list">
      <nav>
        <app-submenu [menuStruct]="menuStruct$ | async"></app-submenu>
      </nav>
    </section>
    <section class="main-content">
      <router-outlet></router-outlet>
    </section>
  `,
  styles: [
    `
      :host {
        display: flex;
        width: 100%;
      }
    `
  ]
})
export class AdministrationHomeComponent implements OnInit {
  managerMenuStruct = [
    { routerLink: ['./team'], title: 'ADMINISTRATION.MENU.ORGANISATION' },
    { routerLink: ['./collections'], title: 'ADMINISTRATION.MENU.COLLECTIONS' },
    { routerLink: ['./stories'], title: 'ADMINISTRATION.MENU.STORIES' },
    { routerLink: ['./tags'], title: 'ADMINISTRATION.MENU.TAGS' },
    { routerLink: ['./users'], title: 'ADMINISTRATION.MENU.USERS' }
  ];

  editorMenuStruct = [
    { routerLink: ['./stories'], title: 'ADMINISTRATION.MENU.STORIES' },
    { routerLink: ['./tags'], title: 'ADMINISTRATION.MENU.TAGS' }
  ];

  menuStruct$: Observable<any[]>;

  constructor(private authService: AuthService) {
    this.menuStruct$ = this.authService.currentStatus$.pipe(
      map(status =>
        status.user && status.user.isManager ? this.managerMenuStruct : this.editorMenuStruct
      )
    );
  }

  ngOnInit() {}
}
