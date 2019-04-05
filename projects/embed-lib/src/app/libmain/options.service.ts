import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface SourcesJSOptions {
  linkbox?: boolean;
  hoverbox?: boolean;
  appserver?: string;
  linkClassName?: string | boolean;
  linkIcon?: boolean;
}

const DEFAULT_OPTIONS: SourcesJSOptions = {
  linkbox: false,
  hoverbox: false,
  appserver: environment.appserver,
  linkClassName: 'sourcesjs-parsed',
  linkIcon: true
};

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  public options = DEFAULT_OPTIONS;
  constructor() {
    const options = <SourcesJSOptions>(!!window['sourcesjs'] ? window['sourcesjs'] : {});
    Object.assign(this.options, options);
  }
}
