import { Component, OnInit, Input } from '@angular/core';

export interface VisibleObject {
  public: boolean;
  confidential: boolean;
}

@Component({
  selector: 'app-visibility',
  template: `
    <label *ngIf="item.public" [matTooltip]="'SOURCE.TOOLTIP.PUBLIC' | translate">
      <icn name="public"></icn>
      <span translate="SOURCE.DATA.PUBLIC" *ngIf="!icononly"></span>
    </label>
    <label *ngIf="!item.public" [matTooltip]="'SOURCE.TOOLTIP.CONFIDENTIAL' | translate">
      <icn name="locked"></icn>
      <span translate="SOURCE.DATA.CONFIDENTIAL" *ngIf="!icononly"></span>
    </label>
  `,
  styles: []
})
export class VisibilityComponent implements OnInit {
  @Input() item: VisibleObject;
  @Input() icononly = false;
  constructor() {}
  ngOnInit() {}
}
