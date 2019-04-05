import { Component, OnInit, Input, ViewChild } from '@angular/core';

/**
 * Simpler version of copy text on click element that does not depend
 * on the material tooltips and icons module and that has
 * svg icon inlined.
 *
 * TODO: in commons, but only required in micropage (?)
 */

@Component({
  selector: 'app-copytext-simple',
  template: `
  <div class="srcs-copytext">
    <input type="text"
      class="srcs-copytext-input"
      readonly="readonly"
      #copyField
      [value]="value"
      (click)="clicked()">
    <i (click)="clicked()"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.4 5.6V3.2H9V2H5.4v1.2H3v9.6h2.4V14h7.2V5.6h-1.2zm-6 6H4.2V4.4h6v1.2H5.4v6zm6 1.2H6.6v-6h4.8v6z"/></svg></i>
   </div>
  `,
  styles: [
    `input {
      background: transparent;
      color: inherit;
      border: none;
      flex: 99 1 auto;
    }`,
    `div {
      display: flex;
      padding: 0;
      width: 100%;
      align-items: center;
      justify-content: space-between;
    }`,
    `i {
      cursor: pointer;
      flex: 1 99 20px;
    }`
  ]
})
export class CopytextComponent implements OnInit {
  @Input() value = '';
  @ViewChild('copyField') copyField;
  constructor() { }

  ngOnInit() {
  }

  clicked() {
    this.copyField.nativeElement.select();
    try {
      document.execCommand('copy');
    } catch (err) {
    }
  }

}
