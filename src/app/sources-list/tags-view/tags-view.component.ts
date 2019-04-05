import { Component } from '@angular/core';
import { TagService } from '../../shared/tag.service';
import { Tag } from '../../shared/tag';
import { SearchService, SearchState } from '../search.service';
import { BookmarkLocalService } from '../../shared/bookmark-local.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchViewBaseComponent } from '../search-view-base.component';
import { FeedbackService } from 'src/app/shared/feedback.service';

@Component({
  templateUrl: './tags-view.component.html',
  styleUrls: ['./tags-view.component.scss']
})
export class TagsViewComponent extends SearchViewBaseComponent {
  tags: Tag[];
  selectedTags: Tag[];
  selfRoute = ['tags'];

  constructor(
    private tagService: TagService,
    searchService: SearchService,
    bookmarkService: BookmarkLocalService,
    router: Router,
    route: ActivatedRoute,
    feedbackService: FeedbackService
  ) {
    super(searchService, bookmarkService, router, route, feedbackService);
  }

  ngOnInit() {
    // Load available tags
    this.tagService.getList().subscribe(tags => {
      this.tags = tags;
      // Update ui state after tags have been loaded
      this.updateUIState(this.searchService.getState());
    });

    this.ngOnInitBase();
  }

  setTags(items) {
    const tags = items.map(v => v.id);
    this.searchService.updateTags(tags);
    this.updateRouter();
  }

  updateComponentSpecificUIState(state: SearchState) {
    this.selectedTags = (this.tags || [])
      .filter(v => state.tags.indexOf('' + v.id) !== -1)
      .map(v => {
        return {
          id: '' + v.id,
          name: v.name
        };
      });
  }
}
