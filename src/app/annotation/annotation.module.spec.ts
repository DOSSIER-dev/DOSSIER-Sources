import { AnnotationModule } from './annotation.module';

describe('AnnotationModule', () => {
  let annotationModule: AnnotationModule;

  beforeEach(() => {
    annotationModule = new AnnotationModule();
  });

  it('should create an instance', () => {
    expect(annotationModule).toBeTruthy();
  });
});
