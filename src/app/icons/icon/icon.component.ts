import { Component, Input } from '@angular/core';

@Component({
  selector: 'icn',
  template: `
    <div [ngClass]="size">
      <mat-icon *ngIf="name" [svgIcon]="name" [ngClass]="size"></mat-icon>
    </div>
  `,
  styles: [
    `
      .mid {
        width: 16px;
        height: 16px;
      }
    `,
    `
      .small {
        width: 12px;
        height: 12px;
      }
    `,
    `
      .large {
        width: 24px;
        height: 24px;
      }
    `,
    `
      div {
        display: inline-block;
      }
    `
    // `div { display: inline-flex; align-items: center; }`
  ]
})
export class IconComponent {
  @Input() name: string;
  @Input() size = 'mid';
}
