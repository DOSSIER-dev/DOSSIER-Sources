import { TestBed } from '@angular/core/testing';

import { AnnotationPanelService } from './annotation-panel.service';

describe('AnnotationPanelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnotationPanelService = TestBed.get(AnnotationPanelService);
    expect(service).toBeTruthy();
  });

  it('should not modify when not required', () => {
    const service: AnnotationPanelService = TestBed.get(AnnotationPanelService);
    const result = service.getDimensions(1000, 500, 420);
    expect(result.width).toBe(500);
    expect(result.x).toBe(420);
    expect(result.nudge).toBe(0);
  });

  it('should reduce width when parent too small', () => {
    const service: AnnotationPanelService = TestBed.get(AnnotationPanelService);
    const result = service.getDimensions(400, 500, 420);
    expect(result.width).toBe(380);
  });

  it('should nudge when overflow left', () => {
    const service: AnnotationPanelService = TestBed.get(AnnotationPanelService);
    const result = service.getDimensions(1000, 500, 200);
    expect(result.width).toBe(500);
    expect(result.x).toBe(260);
    expect(result.nudge).toBe(-60);
  });

  it('should nudge when overflow right', () => {
    const service: AnnotationPanelService = TestBed.get(AnnotationPanelService);
    const result = service.getDimensions(1000, 400, 900);
    expect(result.width).toBe(400);
    expect(result.x).toBe(790);
    expect(result.nudge).toBe(110);
  });

  it('should shrink when symmetric', () => {
    const service: AnnotationPanelService = TestBed.get(AnnotationPanelService);
    const result = service.getDimensions(400, 600, 200);
    expect(result.width).toBe(380);
    expect(result.x).toBe(200);
    expect(result.nudge).toBe(0);
  });

  it('should shrink when not symmetric (left)', () => {
    const service: AnnotationPanelService = TestBed.get(AnnotationPanelService);
    const result = service.getDimensions(400, 600, 100);
    expect(result.width).toBe(380);
    expect(result.x).toBe(200);
    expect(result.nudge).toBe(-100);
  });

  it('should shrink when not symmetric (right)', () => {
    const service: AnnotationPanelService = TestBed.get(AnnotationPanelService);
    const result = service.getDimensions(400, 600, 320);
    expect(result.width).toBe(380);
    expect(result.x).toBe(200);
    expect(result.nudge).toBe(120);
  });
});
