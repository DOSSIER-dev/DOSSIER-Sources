import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Annotation } from './annotation';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnnotationStateService {
  annotations$: BehaviorSubject<Annotation[]> = new BehaviorSubject<Annotation[]>([]);
  activeAnnotation$: BehaviorSubject<Annotation> = new BehaviorSubject<Annotation>(null);
  addMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  reset(annotations: Annotation[] | null | undefined) {
    if (annotations === null || annotations === undefined) {
      this.setAnnotations([]);
    } else {
      this.setAnnotations(annotations);
    }
    this.setActiveAnnotation(null);
    this.setAddMode(false);
  }

  setAnnotations(annotations: Annotation[]) {
    this.annotations$.next(this.customSorted(annotations));
  }

  setActiveAnnotation(annotation: Annotation) {
    // TODO: test here if we want to allow the change of the active
    //       annotation - it could be in edit state with dirty form
    //
    // const old = this.activeAnnotation$.value;
    //

    this.activeAnnotation$.next(annotation);
  }

  setAddMode(state: boolean) {
    this.addMode$.next(state);
  }

  addAnnotation(annotation: Annotation) {
    const newState = this.customSorted(this.annotations$.getValue().concat(annotation));
    this.setAnnotations(newState);
    this.setAddMode(false);
  }

  /**
   * Replaces instance of annotation with its newer form (returned from
   * backend via save).
   * @param originalObject
   * @param annotation
   */
  replaceAnnotation(originalObject: Annotation, annotation: Annotation) {
    const newState = this.customSorted(
      this.annotations$
        .getValue()
        .filter(v => v !== originalObject)
        .concat(annotation)
    );
    this.setAnnotations(newState);

    // If the annotation was active, replace as active one, too
    if (this.getActiveAnnotation() === originalObject) {
      this.setActiveAnnotation(annotation);
    }
  }

  deleteAnnotation(annotation: Annotation) {
    const newState = this.customSorted(
      this.annotations$.getValue().filter(v => v.id !== annotation.id)
    );
    this.setAnnotations(newState);
    this.setActiveAnnotation(null);
  }

  getActiveAnnotation() {
    return this.activeAnnotation$.getValue();
  }

  setLoadedState(state: boolean) {
    this.loaded$.next(state);
  }

  getLoadedState() {
    return this.loaded$.getValue();
  }

  /**
   * Set an nnotation as active, but wait until "loaded" state is reached.
   */
  setAnnotationWhenLoaded(annotation: Annotation) {
    this.loaded$
      .pipe(
        filter(v => v),
        take(1)
      )
      .subscribe(_ => this.setActiveAnnotation(annotation));
  }

  // Helper to keep list of annotations in a stable sort order.
  private customSorted(annotations) {
    return annotations.sort((a, b) => {
      return ('' + a.title).localeCompare(b.title);
    });
  }
}
