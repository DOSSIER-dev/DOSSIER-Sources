import { Component } from '@angular/core';
import { Collection } from '../../administration/collection';
import { CollectionsService } from '../../administration/collections.service';
import { SearchService, SearchState } from '../search.service';
import { BookmarkLocalService } from '../../shared/bookmark-local.service';
import { SelectItem } from '../../shared/selectlist/selectlist.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchViewBaseComponent, DerivedSearchViewComponent } from '../search-view-base.component';
import { FeedbackService } from 'src/app/shared/feedback.service';

@Component({
  templateUrl: './collections-view.component.html',
  styleUrls: ['./collections-view.component.scss']
})
export class CollectionsViewComponent extends SearchViewBaseComponent
  implements DerivedSearchViewComponent {
  collections: Collection[];
  selectedCollections: SelectItem[];
  selfRoute = ['collections'];

  constructor(
    private collectionService: CollectionsService,
    searchService: SearchService,
    bookmarkService: BookmarkLocalService,
    router: Router,
    route: ActivatedRoute,
    feedbackService: FeedbackService
  ) {
    super(searchService, bookmarkService, router, route, feedbackService);
  }

  ngOnInit() {
    // Load available collections
    this.collectionService.getList().subscribe(collections => {
      this.collections = collections;
      // Update ui state after collections have been loaded
      this.updateUIState(this.searchService.getState());
    });

    this.ngOnInitBase();
  }

  setCollection(items) {
    const collections = items.map(v => v.id);
    this.searchService.updateCollections(collections);
    this.updateRouter();
  }

  updateComponentSpecificUIState(state: SearchState) {
    this.selectedCollections = (this.collections || [])
      .filter(v => state.collections.indexOf('' + v.id) !== -1)
      .map(v => {
        return {
          id: '' + v.id,
          name: v.name
        };
      });
  }
}
