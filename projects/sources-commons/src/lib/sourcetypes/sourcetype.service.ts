import { Injectable, Inject, InjectionToken } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SourceType, SourceTypesConfigInterface } from './sourcetype.interface';

export const SourceTypesConfigService = new InjectionToken<SourceTypesConfig>('SourceTypesConfig');

@Injectable({
  providedIn: 'root'
})
export class SourceTypesConfig {
  sourceTypes: Array<SourceType>;
}

/**
 * Holds settings and configuration regarding source-types.
 */
@Injectable({
  providedIn: 'root'
})
export class SourceTypeService {
  sourcetypes: Array<SourceType> = [];

  constructor(@Inject(SourceTypesConfigService) config: SourceTypesConfigInterface) {
    this.sourcetypes = config.sourceTypes;
  }

  getSourceTypeFromCode(code: string) {
    return this.sourcetypes.find(v => v.code === code);
  }

  getSourceTypes() {
    return this.sourcetypes;
  }

  getSourceTypes$(): Observable<SourceType[]> {
    return of(this.sourcetypes);
  }

  getSourceTypeFromCode$(code: string) {
    return this.getSourceTypes$().pipe(
      map(sourcetypes => {
        return sourcetypes.find(v => v.code === code);
      })
    );
  }
}
