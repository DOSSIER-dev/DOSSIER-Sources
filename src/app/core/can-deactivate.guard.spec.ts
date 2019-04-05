import { TestBed, async, inject } from '@angular/core/testing';

import { CanDeactivateGuard } from './can-deactivate.guard';
import { UnsavedChangesService } from '../shared/unsaved-changes.service';

let unsavedChangesStub: Partial<UnsavedChangesService>;

describe('CanDeactivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanDeactivateGuard,
        { provide: UnsavedChangesService, useValue: unsavedChangesStub }
      ]
    });
  });

  it('should ...', inject([CanDeactivateGuard], (guard: CanDeactivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
