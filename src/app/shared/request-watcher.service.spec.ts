import { TestBed } from '@angular/core/testing';

import { RequestWatcherService } from './request-watcher.service';

describe('RequestWatcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestWatcherService = TestBed.get(RequestWatcherService);
    expect(service).toBeTruthy();
  });
});
