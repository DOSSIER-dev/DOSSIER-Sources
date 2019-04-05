import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Router } from '@angular/router';

const httpClient = jasmine.createSpyObj('HttpClient', ['post']);
// const httpPostSpy = httpClient.post.and.returnValue(of(null));

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: httpClient },
        {
          provide: UserService,
          useValue: {
            currentStatus$: { subscribe: () => {} }
          }
        },
        { provide: Router, useValue: {} }
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
