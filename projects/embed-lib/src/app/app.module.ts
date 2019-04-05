import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LibmainModule } from './libmain/libmain.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LibmainModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
