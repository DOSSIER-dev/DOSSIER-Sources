import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatIconModule } from '@angular/material';

/**
 * Sets up icon registry.
 * Icons have to be in the local project's asset directory.
 */
@NgModule({
  imports: [
    MatIconModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class SourcesAssetsModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {

    // src-type
    matIconRegistry.addSvgIcon(
      'src-type-audio',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/src-type/audio/default.svg')
    );
    matIconRegistry.addSvgIcon(
      'src-type-dataset',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/src-type/dataset/default.svg')
    );
    matIconRegistry.addSvgIcon(
      'src-type-document',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/src-type/document/default.svg')
    );
    matIconRegistry.addSvgIcon(
      'src-type-image',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/src-type/image/default.svg')
    );
    matIconRegistry.addSvgIcon(
      'src-type-link',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/src-type/link/default.svg')
    );
    matIconRegistry.addSvgIcon(
      'src-type-video',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/src-type/video/default.svg')
    );
  }
}
