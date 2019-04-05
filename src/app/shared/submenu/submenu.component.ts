import { Component, OnInit, Input } from '@angular/core';

export interface MenuItem {
  routerLink: any;
  title: any;
}

@Component({
  selector: 'app-submenu',
  template: `
    <section>
      <ul>
        <li *ngFor="let item of menuStruct">
          <a
            [routerLink]="item.routerLink"
            routerLinkActive="active-link"
            [translate]="item.title"
          ></a>
        </li>
      </ul>
    </section>
  `,
  styles: [
    `
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        margin-bottom: 2em;
      }
    `
  ]
})
export class SubmenuComponent implements OnInit {
  @Input() menuStruct: MenuItem[];
  constructor() {}
  ngOnInit() {}
}
