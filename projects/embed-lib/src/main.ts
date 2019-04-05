import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Attempt to add angular app into an element with the following id
const containerElementId = 'sourcesjs-box';

const appElement = document.createElement('sourcesjs-root'); // root angular component selector
const containerElement = document.getElementById(containerElementId) || document.body;
containerElement.appendChild(appElement);

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(_ => { console.log('sources.js bootstrapped'); })
  .catch(err => console.log(err));
