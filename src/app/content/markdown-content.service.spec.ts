import { TestBed } from '@angular/core/testing';

import { MarkdownContentService } from './markdown-content.service';
import { TranslateService } from '@ngx-translate/core';

let translateServiceStub: Partial<TranslateService>;

describe('MarkdownContentService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: TranslateService, useValue: translateServiceStub }]
    })
  );

  it('should be created', () => {
    const service: MarkdownContentService = TestBed.get(MarkdownContentService);
    expect(service).toBeTruthy();
  });
});
