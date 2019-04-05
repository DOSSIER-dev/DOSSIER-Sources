import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnotationDetailComponent } from './annotation-detail/annotation-detail.component';
import { AnnotationFormComponent } from './annotation-form/annotation-form.component';
import { AnnotationService } from './annotation.service';
import { AnnotatorComponent } from './annotator/annotator.component';
import { LocationPageComponent } from './location-input/location-page/location-page.component';
import { LocationTextComponent } from './location-input/location-text/location-text.component';
import { LocationTimeComponent } from './location-input/location-time/location-time.component';
import { SharedFormsModule } from '../shared-forms/shared-forms.module';
import { SharedModule } from '../shared/shared.module';
import { AnnotatedModule, COMPONENTS } from 'sources-commons';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharedFormsModule,
    AnnotatedModule.forRoot({
      annotatorComponents: COMPONENTS
    })
  ],
  declarations: [
    AnnotatorComponent,
    AnnotationFormComponent,
    LocationPageComponent,
    LocationTextComponent,
    LocationTimeComponent,
    AnnotationDetailComponent
  ],
  exports: [AnnotatorComponent, AnnotationFormComponent],
  providers: [AnnotationService],
  entryComponents: [LocationPageComponent, LocationTextComponent, LocationTimeComponent]
})
export class AnnotationModule {}
