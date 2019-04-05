import { NgModule, InjectionToken, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourceTypeComponent } from './sourcetype/sourcetype.component';
import { MatIconModule, MatTooltipModule } from '@angular/material';
import { SourceTypesConfigInterface } from './sourcetype.interface';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { SourceTypesConfig, SourceTypesConfigService } from './sourcetype.service';

@NgModule({
  imports: [
    CommonModule,

    // Material
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [SourceTypeComponent],
  exports: [SourceTypeComponent]
})
export class SourceTypesModule {
  static forRoot(config: SourceTypesConfigInterface = { sourceTypes: [] }): ModuleWithProviders {
    return {
      ngModule: SourceTypesModule,
      providers: [
        SourceTypesConfig,
        {
          provide: SourceTypesConfigService,
          useValue: config
        }
      ]
    };
  }
}
