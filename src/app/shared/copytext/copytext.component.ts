import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-copytext',
  template: `
    <div class="srcs-input-style">
      <input
        type="text"
        readonly="readonly"
        class="app-copytext"
        #copyField
        #tooltip="matTooltip"
        [matTooltip]="'WIDGETS.LINK_COPIED' | translate"
        [matTooltipShowDelay]="0"
        [matTooltipDisabled]="disabled"
        [value]="value"
        (click)="clicked()"
      />
      <icn name="clipboard" (click)="clicked()"></icn>
    </div>
  `,
  styles: [
    `
      input {
        font-size: 75%;
        color: inherit;
        max-width: 85%;
        border: none;
      }
    `,
    `
      div {
        display: flex;
        align-items: center;
        padding: 0;
        margin: 0.5em 0;
        width: 100%;
      }
    `,
    `
      icn {
        cursor: pointer;
      }
    `
  ]
})
export class CopytextComponent {
  @Input() value = '';
  @ViewChild('copyField', { static: true }) copyField;
  @ViewChild('tooltip', { static: true }) tooltip;
  disabled = true;

  constructor() {}

  clicked() {
    this.copyField.nativeElement.select();
    try {
      // Copy to clipboard
      document.execCommand('copy');

      // Some trickery to show the tooltip (only now, and not on hover)
      this.disabled = false;
      setTimeout(() => {
        this.tooltip.show();
      }, 0);
      setTimeout(() => {
        this.disabled = true;
        this.tooltip.hide();
      }, 1000);
    } catch (err) {
      // pass
    }
  }
}
