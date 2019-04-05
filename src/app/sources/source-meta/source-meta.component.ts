import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CountryListService } from 'src/app/shared/country-list.service';
import { LanguageListService } from 'src/app/shared/language-list.service';
import { Source } from '../source';

interface TagLikeItem {
  id: any;
  name: string;
}

@Component({
  selector: 'app-source-meta',
  templateUrl: './source-meta.component.html',
  styleUrls: ['./source-meta.component.scss']
})
export class SourceMetaComponent implements OnInit {
  _source: Source;
  tags: TagLikeItem[] = [];
  stories: TagLikeItem[] = [];
  sourceIds: string[] = [];
  language$;
  country$;
  @Input() set source(source: Source) {
    this._source = source;
    this.language$ = this.languageList.lookupByCode(source.language);
    this.country$ = this.countryList.lookupByCode(source.country);

    this.tags = this._sortTagLikeItems(source.tags);
    this.stories = this._sortTagLikeItems(source.stories);

    // Pick a list of non-empty fields that might function as
    // "original source id" (TODO: to be defined what to use here)
    this.sourceIds = [
      source.externalServiceId,
      source.sourceURL,
      source.sourceId,
      source.fileRef && source.fileRef.name
    ].filter(v => v);
  }

  get source() {
    return this._source;
  }

  @Input() bookmarked = false;
  @Output() bookmark = new EventEmitter<boolean>();

  constructor(private countryList: CountryListService, private languageList: LanguageListService) {}

  ngOnInit() {}

  toggleBookmark() {
    this.bookmark.emit(!this.bookmarked);
  }

  private _sortTagLikeItems(items: TagLikeItem[]) {
    return items && items.map ? items.sort((a, b) => a.name.localeCompare(b.name)) : [];
  }
}
