import { Injectable } from '@angular/core';
import { Source } from './source';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';
import { Annotation } from '../annotation/annotation';

/**
 * Helps with building urls.
 */
@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor(private platformLocation: PlatformLocation, private router: Router) {}

  /**
   * Get the URL of a resource.
   * For a file, get the download location, if it is a link/url reference,
   * get that URL.
   */
  getSourceUrl(source: Source) {
    const sourceUrl = source.fileRef ? source.fileRef.downloadUrl : source.sourceURL;
    return sourceUrl;
  }

  getInAppUrlForSource(source: Source) {
    // See sources-routing.module
    return (
      (<any>this.platformLocation).location.origin +
      this.router.createUrlTree(['source', source.id])
    );
  }

  getInAppUrlForAnnotation(annotation: Annotation) {
    // See sources-routing.module
    return (
      (<any>this.platformLocation).location.origin +
      this.router.createUrlTree([
        // TODO: best way to reverse-lookup/ generate url ?
        'source',
        annotation.source_id,
        'annotation',
        annotation.id
      ])
    );
  }
}
