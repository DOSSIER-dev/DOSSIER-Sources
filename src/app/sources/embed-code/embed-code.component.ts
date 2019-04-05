import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Source } from '../source';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-embed-code',
  template: `
    <app-copytext [value]="embed"></app-copytext>
  `,
  styles: []
})
export class EmbedCodeComponent implements OnInit {
  private _source: Source;
  public embed = '';

  @Input() withTag = false;
  @Input() inApp = false;

  @Input() set source(source: Source) {
    this._source = source;

    if (this.inApp) {
      // In-app url for staff members
      this.embed = this.urlService.getInAppUrlForSource(source);
    } else {
      // Share / Embed URL
      if (this.withTag) {
        // with tag
        this.embed = `<a href="${source.shareUrl}">${source.title}</a>`;
      } else {
        // only url
        this.embed = source.shareUrl;
      }
    }
  }

  constructor(private urlService: UrlService) {}
  ngOnInit() {}

  get source() {
    return this._source;
  }
}
