import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { LocationInputComponent } from '../location-input.component';
import { LocationInput } from '../location-input';

@Component({
  selector: 'app-location-time',
  template: `
    <div>
      <label translate="ANNOTATION.LOCATION.TIMECODE_FROM"></label>
      <app-timecode-input
        [(ngModel)]="annotation.timecodeFrom"
        name="timecodeFrom"
      ></app-timecode-input>
    </div>
  `,
  styles: []
})
export class LocationTimeComponent implements LocationInputComponent, OnInit {
  @Input() annotation: LocationInput;
  onChange: EventEmitter<LocationInput>;
  constructor() {}

  ngOnInit() {}
}
