import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnotationModule } from '../annotation/annotation.module';
import { AnnotationsListComponent } from './annotations-list/annotations-list.component';
import { EditbarComponent } from './editbar/editbar.component';
import { EmbedCodeComponent } from './embed-code/embed-code.component';
import { RouterModule } from '@angular/router';
import { SharedFormsModule } from '../shared-forms/shared-forms.module';
import { SharedModule } from '../shared/shared.module';
import { SourceFormComponent } from './source-form/source-form.component';
import { SourceMetaComponent } from './source-meta/source-meta.component';
import { SourcesInputsModule } from '../sources-inputs/sources-inputs.module';
import { SourcesRoutingModule } from './sources-routing.module';
import { SourceViewComponent } from './source-view/source-view.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AnnotationModule,
    SharedFormsModule,
    SharedModule,
    SourcesInputsModule,
    SourcesRoutingModule
  ],
  declarations: [
    AnnotationsListComponent,
    EditbarComponent,
    EmbedCodeComponent,
    SourceFormComponent,
    SourceMetaComponent,
    SourceViewComponent
  ]
})
export class SourcesModule {}
