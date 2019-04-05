import { TestBed, inject } from '@angular/core/testing';

import { AnnotationService } from './annotation.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const httpClient = jasmine.createSpyObj('HttpClient', ['post']);
// let httpPostSpy = httpClient.post.and.returnValue(of(null));

describe('AnnotationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnotationService, { provide: HttpClient, useValue: httpClient }]
    });
  });

  it('should be created', inject([AnnotationService], (service: AnnotationService) => {
    expect(service).toBeTruthy();
  }));
});
