import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { NgUploaderModule } from 'ngx-uploader';
import { SharedModule } from '../shared/shared.module';
import { LinkInputComponent } from './link-input/link-input.component';
import { SourcerefInputComponent } from './sourceref-input/sourceref-input.component';
import { FileInputComponent } from './file-input/file-input.component';
import { AnnotatedModule } from 'sources-commons';

@NgModule({
  imports: [CommonModule, SharedModule, NgUploaderModule, AnnotatedModule],
  declarations: [UploadComponent, LinkInputComponent, SourcerefInputComponent, FileInputComponent],
  exports: [UploadComponent, SourcerefInputComponent],
  entryComponents: [LinkInputComponent, FileInputComponent]
})
export class SourcesInputsModule {}
