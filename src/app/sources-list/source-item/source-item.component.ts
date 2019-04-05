import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SourceItem } from '../source-item';

@Component({
  selector: 'app-source-item',
  templateUrl: './source-item.component.html',
  styleUrls: ['./source-item.component.scss']
})
export class SourceItemComponent implements OnInit, OnChanges {
  @Input() source: SourceItem;
  @Input() searchState: {};
  @Input() backRoute: any;

  highlights: string[];
  showHighlights = false;
  optional: {};

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.source !== undefined) {
      this.highlights = this._flattenHighlights(this.source.highlight || {});
      this.showHighlights = this.highlights.length > 0;
    }

    this.optional = {};
    if (this.backRoute) {
      this.optional['_br'] = this.backRoute;
    }
  }

  /**
   * Turn dictionary of lists into one list.
   * @param highlights
   */
  private _flattenHighlights(highlights) {
    return Object.keys(highlights).reduce((prev, cur) => prev.concat(highlights[cur]), []);
  }
}
