import { NgModule } from '@angular/core';
import { ComponentHostDirective } from './component-host.directive';
import { CopytextComponent } from './copytext/copytext.component';
import { AnnotationPanelComponent } from './annotation-panel/annotation-panel.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
    CopytextComponent,
    ComponentHostDirective,
    AnnotationPanelComponent,
    PaginationComponent,
  ],
  exports: [
    CopytextComponent,
    ComponentHostDirective,
    AnnotationPanelComponent,
    PaginationComponent
  ]
})
export class SourcesCommonsModule { }
