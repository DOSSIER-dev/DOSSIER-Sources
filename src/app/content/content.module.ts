import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { MarkdownModule } from 'ngx-markdown';
import { ContentViewComponent } from './content-view/content-view.component';

@NgModule({
  imports: [CommonModule, MarkdownModule.forChild()],
  declarations: [ContentComponent, ContentViewComponent],
  exports: [ContentComponent]
})
export class ContentModule {}
