import { NgModule } from '@angular/core';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  imports: [MatIconModule],
  declarations: [],
  exports: [MatIconModule]
})
export class IconsModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    const icons = [
      // circle
      ['circle-cancel', 'assets/icons/circle/cancel.svg'],
      ['circle-info', 'assets/icons/circle/info.svg'],

      // src-type
      ['src-type-audio', 'assets/icons/src-type/audio/default.svg'],
      ['src-type-dataset', 'assets/icons/src-type/dataset/default.svg'],
      ['src-type-document', 'assets/icons/src-type/document/default.svg'],
      ['src-type-image', 'assets/icons/src-type/image/default.svg'],
      ['src-type-link', 'assets/icons/src-type/link/default.svg'],
      ['src-type-video', 'assets/icons/src-type/video/default.svg']
    ];

    icons.forEach(([name, path]) => {
      matIconRegistry.addSvgIcon(name, domSanitizer.bypassSecurityTrustResourceUrl(path));
    });
  }
}
