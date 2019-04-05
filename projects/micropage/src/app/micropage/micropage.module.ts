import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MicropageComponent } from './micropage/micropage.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ViewersModule } from '../viewers/viewers.module';
import { SourcesCommonsModule } from 'sources-commons';
import { AnnotationDetailComponent } from './annotation-detail/annotation-detail.component';
import { RouterModule } from '@angular/router';
import { SourcesAssetsModule } from 'sources-commons';
import { AnnotationsComponent } from './annotations/annotations.component';
import { SourcetypeComponent } from './sourcetype/sourcetype.component';
import { IconsModule } from '../icons/icons.module';

@NgModule({
  imports: [
    CommonModule,
    ViewersModule,

    RouterModule,

    SourcesCommonsModule,
    SourcesAssetsModule,
    IconsModule
  ],
  declarations: [
    MicropageComponent,
    SidebarComponent,
    NotfoundComponent,
    AnnotationDetailComponent,
    AnnotationsComponent,
    SourcetypeComponent
  ]
})
export class MicropageModule {}
