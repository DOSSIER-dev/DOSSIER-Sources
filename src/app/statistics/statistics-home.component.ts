import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-home',
  template: `
    <section class="column-level-2 srcs-list">
      <nav>
        <app-submenu [menuStruct]="menuStruct"></app-submenu>
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
export class StatisticsHomeComponent implements OnInit {
  menuStruct = [
    { routerLink: ['./inventory'], title: 'STATS.MENU.INVENTORY' },
    { routerLink: ['./source-views'], title: 'STATS.MENU.SOURCEVIEWS' }
    // { routerLink: false, title: 'STATS.MENU.CLIENTVIEWS' },
    // { routerLink: false, title: 'STATS.MENU.CLIENTSHARE' },
    // { routerLink: false, title: 'STATS.MENU.TIME' },
  ];

  constructor() {}

  ngOnInit() {}
}
