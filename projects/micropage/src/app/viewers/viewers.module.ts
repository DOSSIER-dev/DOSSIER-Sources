import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewerComponent } from './viewer/viewer.component';
import { AnnotatedModule, COMPONENTS, SourcesCommonsModule } from 'sources-commons';
import { SourceTypesModule, DEFAULT_SOURCETYPES } from 'projects/sources-commons/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    AnnotatedModule.forRoot({
      annotatorComponents: COMPONENTS
    }),
    SourceTypesModule.forRoot({ sourceTypes: DEFAULT_SOURCETYPES }),
    SourcesCommonsModule
  ],
  declarations: [ViewerComponent],
  exports: [ViewerComponent],
  entryComponents: []
})
export class ViewersModule {}
