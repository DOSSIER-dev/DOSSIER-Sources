import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { LocationInputComponent } from '../location-input.component';
import { LocationInput } from '../location-input';

@Component({
  selector: 'app-location-page',
  template: `
    <ng-container *ngIf="showAnnotationCoords">
      <div>
        <label translate="ANNOTATION.LOCATION.PAGE"></label>
        <input type="text" [(ngModel)]="annotation.page" name="page" />
      </div>
      <div>
        <label translate="ANNOTATION.LOCATION.LEFT"></label>
        <input type="text" [(ngModel)]="annotation.pageX" name="pageX" />
      </div>
      <div>
        <label translate="ANNOTATION.LOCATION.TOP"></label>
        <input type="text" [(ngModel)]="annotation.pageY" name="pageY" />
      </div>
      <div>
        <label translate="ANNOTATION.LOCATION.WIDTH"></label>
        <input type="text" [(ngModel)]="annotation.width" name="width" />
      </div>
      <div>
        <label translate="ANNOTATION.LOCATION.HEIGHT"></label>
        <input type="text" [(ngModel)]="annotation.height" name="height" />
      </div>
    </ng-container>
  `,
  styles: []
})
export class LocationPageComponent implements LocationInputComponent, OnInit {
  @Input() annotation: LocationInput;
  onChange: EventEmitter<LocationInput>;

  // show hide input forms for coordinates
  showAnnotationCoords = false;

  constructor() {}

  ngOnInit() {}
}
