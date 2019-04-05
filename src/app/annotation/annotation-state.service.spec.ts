import { TestBed, inject } from '@angular/core/testing';

import { AnnotationStateService } from './annotation-state.service';

describe('AnnotationStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnotationStateService]
    });
  });

  it('should be created', inject([AnnotationStateService], (service: AnnotationStateService) => {
    expect(service).toBeTruthy();
  }));
});
