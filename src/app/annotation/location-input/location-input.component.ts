import { LocationInput } from './location-input';
import { EventEmitter } from '@angular/core';

export interface LocationInputComponent {
  annotation: LocationInput;
  onChange: EventEmitter<LocationInput>;
}
