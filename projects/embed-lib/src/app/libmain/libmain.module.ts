import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibmainComponent } from './libmain/libmain.component';
import { HttpClientModule } from '@angular/common/http';
import { SourceboxComponent } from './sourcebox/sourcebox.component';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [LibmainComponent, SourceboxComponent],
  exports: [LibmainComponent]
})
export class LibmainModule {}
