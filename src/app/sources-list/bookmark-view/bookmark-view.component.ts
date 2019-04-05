import { Component, OnInit } from '@angular/core';
import { BookmarkLocalService } from 'src/app/shared/bookmark-local.service';
import { map } from 'rxjs/operators';
import { SearchResult, SearchResultSummary } from '../search-result';
import { FeedbackService } from 'src/app/shared/feedback.service';

@Component({
  selector: 'app-bookmark-view',
  templateUrl: './bookmark-view.component.html',
  styleUrls: ['./bookmark-view.component.scss']
})
export class BookmarkViewComponent implements OnInit {
  selfRoute = ['bookmarks'];
  currentResult = new SearchResult();
  currentResultSummary: {};
  constructor(
    private bookmarkService: BookmarkLocalService,
    private feedbackService: FeedbackService
  ) {
    // Query bookmarked user's sources
    this.bookmarkService
      .getBookmarks()
      .pipe(
        // Manually craft a search result type, as this query is not
        // coming from the search backend but is a plain DRF query.
        map(bookmarks => ({
          results: bookmarks.map(v => v.source),
          count: bookmarks.length,
          page: null,
          numPages: null
        }))
      )
      .subscribe(
        result => {
          this.currentResult = result;
          this.currentResultSummary = new SearchResultSummary(result);
        },
        err => {
          this.feedbackService.showError('SHARED.MESSAGES.GET_ERROR');
          this.currentResultSummary = new SearchResultSummary(0);
        }
      );
  }

  ngOnInit() {}
}
