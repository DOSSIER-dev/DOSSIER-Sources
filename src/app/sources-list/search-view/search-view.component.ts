import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { BookmarkLocalService } from '../../shared/bookmark-local.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchViewBaseComponent } from '../search-view-base.component';
import { FeedbackService } from 'src/app/shared/feedback.service';

@Component({
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.scss']
})
export class SearchViewComponent extends SearchViewBaseComponent implements OnInit {
  selfRoute = ['search'];

  constructor(
    searchService: SearchService,
    bookmarkService: BookmarkLocalService,
    router: Router,
    route: ActivatedRoute,
    feedbackService: FeedbackService
  ) {
    super(searchService, bookmarkService, router, route, feedbackService);
  }

  ngOnInit() {
    this.ngOnInitBase();
  }

  updateComponentSpecificUIState() {
    // nothing to do here
  }
}
