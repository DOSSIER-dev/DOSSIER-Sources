import { TestBed } from '@angular/core/testing';

import { BackendErrorHandlerService } from './backend-error-handler.service';
import { FeedbackService } from './feedback.service';

const feedbackSpy = jasmine.createSpyObj('FeedbackService', ['showSuccess', 'showError']);

describe('BackendErrorHandlerService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: FeedbackService, useValue: feedbackSpy }]
    })
  );

  it('should be created', () => {
    const service: BackendErrorHandlerService = TestBed.get(BackendErrorHandlerService);
    expect(service).toBeTruthy();
  });
});
