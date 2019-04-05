import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatTooltipModule
} from '@angular/material';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';
import { TimecodeInputComponent } from './timecode-input/timecode-input.component';
import { VisibilityInputComponent } from './visibility-input/visibility-input.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IconsModule,

    // Material
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatDatepickerModule
  ],
  declarations: [MultiselectComponent, TimecodeInputComponent, VisibilityInputComponent],
  exports: [
    MultiselectComponent,
    TimecodeInputComponent,
    VisibilityInputComponent,

    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ]
})
export class SharedFormsModule {}
