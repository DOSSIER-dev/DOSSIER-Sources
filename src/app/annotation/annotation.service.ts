import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Annotation } from './annotation';

@Injectable()
export class AnnotationService {
  constructor(private httpClient: HttpClient) {}

  addAnnotation(sourceId: number, annotation: Annotation) {
    return this.httpClient.post(`/api/sources/sources/${sourceId}/annotations/`, annotation);
  }

  updateAnnotation(sourceId: number, annotation: Annotation) {
    return this.httpClient.put<Annotation>(
      `/api/sources/sources/${sourceId}/annotations/${annotation.id}/`,
      annotation
    );
  }

  deleteAnnotation(sourceId: number, annotation: Annotation) {
    return this.httpClient.delete(`/api/sources/sources/${sourceId}/annotations/${annotation.id}/`);
  }
}
