import { SourceRef } from './sourceref';
import { EventEmitter } from '@angular/core';
import { SourceType } from 'sources-commons/public_api';

export interface SourceRefComponent {
  sourcetype: SourceType;
  updated: EventEmitter<SourceRef>;
}
