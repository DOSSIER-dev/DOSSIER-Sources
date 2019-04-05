import { TestBed, inject } from '@angular/core/testing';

import { UrlService } from './url.service';
import { Router } from '@angular/router';

describe('UrlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlService, { provide: Router, useValue: {} }]
    });
  });

  it('should be created', inject([UrlService], (service: UrlService) => {
    expect(service).toBeTruthy();
  }));
});
