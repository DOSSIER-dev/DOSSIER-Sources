import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MarkdownContentService {
  BASE_DIR = '/assets/markdown';
  contentCollection: { [key: string]: any } = {
    'sources-in-your-org': 'sources-in-your-org.md',
    login: 'login.md',
    about: 'about.md',
    help: 'help.md',
    index: 'index.md'
  };

  constructor(private translate: TranslateService) {}

  getUrl(contentName: string) {
    const lang = this.translate.currentLang || 'en';
    const contentFile = this.contentCollection[contentName];
    return [this.BASE_DIR, lang, contentFile].join('/');
  }
}
