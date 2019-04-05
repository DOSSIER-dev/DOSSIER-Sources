import { Component, OnInit } from '@angular/core';
import { SourceTypeService, SourceType } from 'sources-commons';
import { mergeMap, map } from 'rxjs/operators';
import { SearchService, SearchState } from '../search.service';
import { SelectItem } from 'src/app/shared/selectlist/selectlist.component';
import { BookmarkLocalService } from 'src/app/shared/bookmark-local.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, combineLatest } from 'rxjs';
import { SearchViewBaseComponent } from '../search-view-base.component';
import { FeedbackService } from 'src/app/shared/feedback.service';

@Component({
  templateUrl: './types-view.component.html',
  styleUrls: ['./types-view.component.scss']
})
export class TypesViewComponent extends SearchViewBaseComponent implements OnInit {
  selectedTypes: SelectItem[];
  sourcetypes$: Observable<SourceType[]>;
  selfRoute = ['type'];

  constructor(
    private sourceTypeService: SourceTypeService,
    private translateService: TranslateService,
    searchService: SearchService,
    bookmarkService: BookmarkLocalService,
    router: Router,
    route: ActivatedRoute,
    feedbackService: FeedbackService
  ) {
    super(searchService, bookmarkService, router, route, feedbackService);
  }

  ngOnInit() {
    // Load + translate available types
    this.sourcetypes$ = this.sourceTypeService.getSourceTypes$().pipe(
      mergeMap(types =>
        combineLatest(
          of(types),
          this.translateService.get(types.map(v => 'SOURCETYPES.TYPES.' + v.code))
        )
      ),
      map(([types, translations]) =>
        types.map(type =>
          Object.assign(type, {
            translatedName: translations['SOURCETYPES.TYPES.' + type.code]
          })
        )
      )
    );
    this.ngOnInitBase();
  }

  setType(items) {
    const types = (<SourceType[]>items).map(v => v.code);
    this.searchService.updateSourcetypes(types);
    this.updateRouter();
  }

  updateComponentSpecificUIState(state: SearchState) {
    this.sourcetypes$.subscribe(sourcetypes => {
      this.selectedTypes = sourcetypes
        .filter(v => state.sourcetypes.indexOf(v.code) !== -1)
        .map(v => {
          return {
            id: null,
            name: v.name
          };
        });
    });
  }
}
