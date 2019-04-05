import { TestBed } from '@angular/core/testing';

import { UnsavedChangesService } from './unsaved-changes.service';
import { Overlay } from '@angular/cdk/overlay';

let overlayStub: Partial<Overlay>;

overlayStub = {};

describe('UnsavedChangesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: Overlay, useValue: overlayStub }]
    })
  );

  it('should be created', () => {
    const service: UnsavedChangesService = TestBed.get(UnsavedChangesService);
    expect(service).toBeTruthy();
  });
});
