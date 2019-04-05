import { Component } from '@angular/core';

@Component({
  selector: 'app-column-layout',
  template: `
    <div class="panel" [class.config60]="config60_40">
      <div class="col c1">
        <ng-content select="[app-left-col]"></ng-content>
      </div>
      <div class="col c2">
        <ng-content select="[app-right-col]"></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      div.panel {
        display: flex;
        flex-wrap: no-wrap;
        align-items: flex-start;
      }
    `,
    `
      .col {
        width: 50%;
      }
    `,
    `
      .col:first-child {
        margin-right: 6px;
      }
    `,
    `
      .col:last-child {
        margin-left: 6px;
      }
    `,
    `
      .col.c1 {
        width: 60%;
      }
    `,
    `
      .col.c2 {
        width: 40%;
      }
    `
  ]
})
export class ColumnLayoutComponent {
  config60_40 = true;
}
