import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasAnnotationsComponent } from './canvas-annotations/canvas-annotations.component';
import { ImageAnnotationComponent } from './image-annotation/image-annotation.component';
import { VideoAnnotationComponent } from './video-annotation/video-annotation.component';
import { VimeoAnnotationComponent } from './vimeo-annotation/vimeo-annotation.component';
import { PdfDisplayComponent } from './pdf-display/pdf-display.component';
import { PdfAnnotationComponent } from './pdf-annotation/pdf-annotation.component';
import { TextAnnotationComponent } from './text-annotation/text-annotation.component';
import { SourcesCommonsModule } from '../sources-commons.module';
import { AnnotationsConfig, AnnotationComponentResolver, AnnotationsConfigService } from './annotator-factory.service';

@NgModule({
  imports: [CommonModule, SourcesCommonsModule],
  declarations: [
    CanvasAnnotationsComponent,
    ImageAnnotationComponent,
    VideoAnnotationComponent,
    VimeoAnnotationComponent,
    PdfDisplayComponent,
    PdfAnnotationComponent,
    TextAnnotationComponent
  ],
  exports: [
    CanvasAnnotationsComponent,
    ImageAnnotationComponent,
    VideoAnnotationComponent,
    VimeoAnnotationComponent,
    PdfAnnotationComponent,
    TextAnnotationComponent
  ],
  entryComponents: [
    ImageAnnotationComponent,
    VideoAnnotationComponent,
    VimeoAnnotationComponent,
    PdfAnnotationComponent,
    TextAnnotationComponent
  ]
})
export class AnnotatedModule {
  static forRoot(config: AnnotationsConfig = { annotatorComponents: {} }): ModuleWithProviders {
    return {
      ngModule: AnnotatedModule,
      providers: [
        AnnotationComponentResolver,
        {
          provide: AnnotationsConfigService,
          useValue: config
        }
      ]
    };
  }
}
