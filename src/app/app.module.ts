import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { SourcesListModule } from './sources-list/sources-list.module';
import { MiscModule } from './misc/misc.module';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { SourcesModule } from './sources/sources.module';
import { CoreModule } from './core/core.module';
import { AdministrationModule } from './administration/administration.module';
import { StatisticsModule } from './statistics/statistics.module';
import { MatNativeDateModule } from '@angular/material';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Framework
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken'
    }),

    // For the material components that have animation (like tooltip)
    BrowserAnimationsModule,

    // Ngx-translate
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    // Markdown
    MarkdownModule.forRoot({ loader: HttpClient }),

    // Required by MatDatepicker
    MatNativeDateModule,

    // App modules
    AppRoutingModule,
    CoreModule,
    SharedModule,
    SourcesListModule,
    SourcesModule,
    AdministrationModule,
    StatisticsModule,
    MiscModule // last, as it contains the 404/catchall route
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  // Use the version in the query, as a "cache-buster"
  const vers = environment.version || '';
  return new TranslateHttpLoader(http, '/assets/i18n/', `.json?v=${vers}`);
}
