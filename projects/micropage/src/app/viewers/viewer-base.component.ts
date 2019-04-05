import { Annotation } from '../micropage/annotation';
import { EventEmitter } from '@angular/core';
import { Source } from '../micropage/source';

/**
 * Interface that all annotation components implement.
 * Just for the "viewer"-context.
 * (Stripped-down version of interface AnnotationComponent)
 */
export interface ViewerBaseComponent {
  // TODO: resourceUrl can be dropped, as it is all done over the source itself ?
  //        currently it *is* still required, as the internal url is
  //     a) not on the source (coming from backend) yet
  //     b) cannot be derived via url-service, this requires source and not source-ref type
  //
  resourceUrl: string;

  source: Source;
  annotations: Annotation[];
  activeAnnotation: Annotation;
  selected: EventEmitter<Annotation>;
  interacted: EventEmitter<Annotation>;
  loaded: EventEmitter<any>;

  // used to choose style classes in re-usable components (such as
  // style mobile behavior)
  viewMode?: any;

  goToAnnotation(annotation: Annotation);
}
