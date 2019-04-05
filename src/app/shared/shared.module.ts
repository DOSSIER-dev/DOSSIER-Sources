import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainmenuComponent } from './mainmenu/mainmenu.component';
import { AppRoutingModule } from '../app-routing.module';
import { SelectlistComponent } from './selectlist/selectlist.component';
import { CoreModule } from '../core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatProgressBarModule,
  MatTooltipModule,
  MatTooltipDefaultOptions,
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatProgressSpinnerModule
} from '@angular/material';

import { ActivityStateComponent } from './activity-state/activity-state.component';
import { ColumnLayoutComponent } from './column-layout/column-layout.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { DeleteConfirmPanelComponent } from './delete-confirm/delete-confirm-panel.component';
import { ErrorComponent } from './error/error.component';
import { IconsModule } from '../icons/icons.module';
import { InfoFieldComponent } from './info-field/info-field.component';
import { MultilineTextComponent } from './multiline-text/multiline-text.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PanelComponent } from './panel/panel.component';
import { SavestateComponent } from './savestate/savestate.component';
import { SourceTypesModule, SourcesCommonsModule, DEFAULT_SOURCETYPES } from 'sources-commons';
import { SubmenuComponent } from './submenu/submenu.component';
import { UnsavedConfirmComponent } from './unsaved-confirm/unsaved-confirm.component';
import { UsernamePipe } from './username.pipe';
import { VisibilityComponent } from './visibility/visibility.component';

// TODO: There is a duplicate / component of same name in the commons library ?
import { CopytextComponent } from './copytext/copytext.component';

export const sourcesTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 200,
  hideDelay: 200,
  touchendHideDelay: 200
};

@NgModule({
  imports: [
    AppRoutingModule,
    CommonModule,
    CoreModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,

    IconsModule,

    // Material
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,

    // Cdk
    OverlayModule,

    // the commons module
    SourcesCommonsModule,
    SourceTypesModule.forRoot({ sourceTypes: DEFAULT_SOURCETYPES })
  ],
  declarations: [
    ActivityStateComponent,
    ColumnLayoutComponent,
    CopytextComponent,
    DeleteConfirmComponent,
    DeleteConfirmPanelComponent,
    ErrorComponent,
    InfoFieldComponent,
    MainmenuComponent,
    MultilineTextComponent,
    PanelComponent,
    SavestateComponent,
    SelectlistComponent,
    SubmenuComponent,
    UnsavedConfirmComponent,
    UsernamePipe,
    VisibilityComponent
  ],
  exports: [
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,

    ActivityStateComponent,
    ColumnLayoutComponent,
    CopytextComponent,
    DeleteConfirmComponent,
    ErrorComponent,
    InfoFieldComponent,
    MainmenuComponent,
    MultilineTextComponent,
    PanelComponent,
    SavestateComponent,
    SelectlistComponent,
    SubmenuComponent,
    UnsavedConfirmComponent,
    UsernamePipe,
    VisibilityComponent,

    IconsModule,

    // Material + CDK
    MatTooltipModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,

    // OverlayModule,

    // export what we need from the commons module
    // TODO: could also require the commons module(s) in the feature mdules
    SourceTypesModule,
    SourcesCommonsModule
  ],
  entryComponents: [UnsavedConfirmComponent, DeleteConfirmPanelComponent],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: sourcesTooltipDefaults },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        verticalPosition: 'top'
      }
    }
  ]
})
export class SharedModule {}
