import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconComponent } from './icon/icon.component';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [IconComponent],
  exports: [
    MatIconModule, // TODO: don't export  anymore in case everyone uses IconComponent
    IconComponent
  ]
})
export class IconsModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    const icons = [
      // default
      [
        // Duplicate icon . TODO: remove once no one uses it
        'default',
        'assets/icons/src-type/document/default.svg'
      ],

      // circle
      ['circle-add', 'assets/icons/circle/add.svg'],
      ['circle-cancel', 'assets/icons/circle/cancel.svg'],
      ['circle-delete', 'assets/icons/circle/delete.svg'],
      ['circle-edit', 'assets/icons/circle/edit.svg'],
      ['circle-info', 'assets/icons/circle/info.svg'],
      ['circle-save', 'assets/icons/circle/save.svg'],

      // instance
      ['instance-default', 'assets/icons/instance/instance/default.svg'],
      ['instance-master', 'assets/icons/instance/master/default.svg'],

      // src-tool
      ['src-tool-delete', 'assets/icons/src-tool/delete/default.svg'],
      ['src-tool-download', 'assets/icons/src-tool/download/default.svg'],
      ['src-tool-edit', 'assets/icons/src-tool/edit/default.svg'],
      ['src-tool-instance', 'assets/icons/src-tool/instance/default.svg'],
      ['src-tool-replace', 'assets/icons/src-tool/replace/default.svg'],

      // src-type
      ['src-type-audio', 'assets/icons/src-type/audio/default.svg'],
      ['src-type-dataset', 'assets/icons/src-type/dataset/default.svg'],
      ['src-type-document', 'assets/icons/src-type/document/default.svg'],
      ['src-type-image', 'assets/icons/src-type/image/default.svg'],
      ['src-type-link', 'assets/icons/src-type/link/default.svg'],
      ['src-type-video', 'assets/icons/src-type/video/default.svg'],

      // various
      ['add-source', 'assets/icons/various/add-source/default.svg'],
      ['back', 'assets/icons/various/back/default.svg'],
      ['bookmark', 'assets/icons/various/bookmark/default.svg'],
      ['bookmark-notset', 'assets/icons/various/bookmark/not-set.svg'],
      ['check', 'assets/icons/various/check/default.svg'],
      ['check-dark', 'assets/icons/various/check/check-dark.svg'],
      ['clear', 'assets/icons/various/clear/default.svg'],
      ['clipboard', 'assets/icons/various/clipboard/default.svg'],
      ['close', 'assets/icons/various/close/default.svg'],
      ['error', 'assets/icons/various/close/default.svg'],
      ['delete', 'assets/icons/various/delete/default.svg'],
      ['dropdown', 'assets/icons/various/dropdown/default.svg'],
      ['edit', 'assets/icons/various/edit/default.svg'],
      ['locked', 'assets/icons/various/locked/default.svg'],
      ['more', 'assets/icons/various/more/default.svg'],
      ['none', 'assets/icons/various/none/default.svg'],
      ['progress', 'assets/icons/various/progress/default.svg'],
      ['public', 'assets/icons/various/public/default.svg'],
      ['save', 'assets/icons/save.svg'],
      ['search', 'assets/icons/various/search/default.svg'],

      // pagination
      ['page-next', 'assets/icons/pagination-forward.svg'],
      ['page-previous', 'assets/icons/pagination-back.svg']
    ];

    icons.forEach(([name, path]) => {
      matIconRegistry.addSvgIcon(name, domSanitizer.bypassSecurityTrustResourceUrl(path));
    });
  }
}
