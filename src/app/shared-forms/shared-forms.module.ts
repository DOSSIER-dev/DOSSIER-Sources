import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
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
