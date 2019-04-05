import { Component } from '@angular/core';
import { StoryService } from '../../shared/story.service';
import { Story } from '../../shared/story';
import { SearchService, SearchState } from '../search.service';
import { BookmarkLocalService } from '../../shared/bookmark-local.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchViewBaseComponent } from '../search-view-base.component';
import { FeedbackService } from 'src/app/shared/feedback.service';

@Component({
  templateUrl: './stories-view.component.html',
  styleUrls: ['./stories-view.component.scss']
})
export class StoriesViewComponent extends SearchViewBaseComponent {
  stories: Story[];
  selectedStories: Story[];
  selfRoute = ['stories'];

  constructor(
    private storyService: StoryService,
    searchService: SearchService,
    bookmarkService: BookmarkLocalService,
    router: Router,
    route: ActivatedRoute,
    feedbackService: FeedbackService
  ) {
    super(searchService, bookmarkService, router, route, feedbackService);
  }

  ngOnInit() {
    // Load available stories
    this.storyService.getList().subscribe(stories => {
      this.stories = stories;
      // Update ui state after stories have been loaded
      this.updateUIState(this.searchService.getState());
    });

    this.ngOnInitBase();
  }

  setStories(items) {
    const stories = items.map(v => v.id);
    this.searchService.updateStories(stories);
    this.updateRouter();
  }

  updateComponentSpecificUIState(state: SearchState) {
    this.selectedStories = (this.stories || [])
      .filter(v => state.stories.indexOf('' + v.id) !== -1)
      .map(v => {
        return {
          id: '' + v.id,
          name: v.name
        };
      });
  }
}
