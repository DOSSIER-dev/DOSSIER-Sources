import { TestBed, inject } from '@angular/core/testing';

import { ResourceDetectService } from './resource-detect.service';

describe('ResourceDetectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResourceDetectService]
    });
  });

  it('should be created', inject([ResourceDetectService], (service: ResourceDetectService) => {
    expect(service).toBeTruthy();
  }));

  it('should fallback to MISC type if no test matches', inject(
    [ResourceDetectService],
    (service: ResourceDetectService) => {
      const res = service.detectResourceTypeFromUrl('http://some.other.url');
      expect(res.hasMatch).toBe(false);
      expect(res.sourcetypecode).toBe('MISC');
    }
  ));

  it('should detect youtube links in long form', inject(
    [ResourceDetectService],
    (service: ResourceDetectService) => {
      const res = service.detectResourceTypeFromUrl('https://www.youtube.com/watch?v=bk7CWYTJPZs');
      expect(res.hasMatch).toBe(true);
      expect(res.sourcetypecode).toBe('VIDEO');
      expect(res.service).toBe('youtube');
      expect(res.embedId).toBe('bk7CWYTJPZs');
    }
  ));

  it('should detect youtube links in short form', inject(
    [ResourceDetectService],
    (service: ResourceDetectService) => {
      const res = service.detectResourceTypeFromUrl('https://youtu.be/bk7CWYTJPZs');
      expect(res.hasMatch).toBe(true);
      expect(res.sourcetypecode).toBe('VIDEO');
      expect(res.service).toBe('youtube');
      expect(res.embedId).toBe('bk7CWYTJPZs');
    }
  ));
});
