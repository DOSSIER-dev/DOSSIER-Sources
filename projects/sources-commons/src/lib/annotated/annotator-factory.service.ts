import { Injectable, Type, InjectionToken, Inject } from '@angular/core';
import { SourceRef } from './sourceref';
import { AnnotationComponent } from './annotation.component';
import { PdfAnnotationComponent } from './pdf-annotation/pdf-annotation.component';
import { TextAnnotationComponent } from './text-annotation/text-annotation.component';
import { VideoAnnotationComponent } from './video-annotation/video-annotation.component';
import { VimeoAnnotationComponent } from './vimeo-annotation/vimeo-annotation.component';
import { ImageAnnotationComponent } from './image-annotation/image-annotation.component';

export interface AnnotationsConfig {
  annotatorComponents: { [key: string]: Type<AnnotationComponent> };
}

export const AnnotationsConfigService = new InjectionToken<AnnotationsConfig>('AnnotationsConfig');

@Injectable({
  providedIn: 'root'
})
export class AnnotationComponentResolver {
  components: AnnotationsConfig;
}

export interface AnnotationComponentMap {
  [key: string]: Type<AnnotationComponent>;
};

@Injectable({
  providedIn: 'root'
})
export class AnnotatorFactoryService {
  components: AnnotationComponentMap;
  constructor(@Inject(AnnotationsConfigService) annotationsConfig: AnnotationsConfig) {
    this.components = annotationsConfig.annotatorComponents;
  }
  getComponentClass(source: SourceRef) {
    let type = '';
    if (source.fileRef) {
      const mime = source.fileRef.mimeType;
      if (/image\/.*/.test(mime)) {
        type = 'IMG';
      } else if (mime === 'application/pdf') {
        type = 'PDF';
      } else {
        type = 'MISC';
      }
    } else if (source.sourcetype === 'VIDEO') {
      // TODO: properly resolve the component type from the serviceName field
      if (source.sourceURL.match(/vimeo/)) {
        type = 'VIMEO';
      } else {
        type = 'VIDEO';
      }
    } else {
      type = null;
    }
    const componentClass = this.components[type] || undefined;
    if (!componentClass) {
      throw Error(`No annotation component for type '${type}'`);
    }
    return componentClass;
  }
}


export const COMPONENTS: AnnotationComponentMap = {
  PDF: PdfAnnotationComponent,
  VIDEO: VideoAnnotationComponent,
  VIMEO: VimeoAnnotationComponent,
  IMG: ImageAnnotationComponent,
  MISC: TextAnnotationComponent
};