import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { LocationInputComponent } from '../location-input.component';
import { LocationInput } from '../location-input';

@Component({
  selector: 'app-location-text',
  template: `
    <div>
      <label translate="ANNOTATION.LOCATION.TEXT"></label>
      <input type="text" [(ngModel)]="annotation.locationText" name="locationText" />
    </div>
  `,
  styles: []
})
export class LocationTextComponent implements LocationInputComponent, OnInit {
  @Input() annotation: LocationInput;
  onChange: EventEmitter<LocationInput>;
  constructor() {}

  ngOnInit() {}
}
