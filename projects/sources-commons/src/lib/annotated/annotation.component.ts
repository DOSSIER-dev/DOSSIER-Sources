import { Annotation } from './annotation';
import { EventEmitter } from '@angular/core';
import { SourceRef } from './sourceref';

/**
 * Interface that all annotation components implement.
 */
export interface AnnotationComponent {

  // TODO: resourceUrl can be dropped, as it is all done over the source itself ?
  //        currently it *is* still required, as the internal url is
  //     a) not on the source (coming from backend) yet
  //     b) cannot be derived via url-service, this requires source and not source-ref type
  //
  //  In addition, there might not be a source yet, just a file-ref (in process of creating source)
  //
  resourceUrl: string;

  source: SourceRef;
  annotations: Annotation[];
  activeAnnotation: Annotation;
  addMode: boolean;
  added: EventEmitter<Annotation>;
  selected: EventEmitter<Annotation>;
  interacted: EventEmitter<Annotation>;
  loaded: EventEmitter<any>;

  // used to choose style classes in re-usable components (such as
  // style mobile behavior)
  viewMode?: any;


  // TODO : not sure if this is still needed
  goToAnnotation(annotation: Annotation);

}
