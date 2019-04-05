import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import { BookmarkLocalService } from 'src/app/shared/bookmark-local.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchViewBaseComponent } from '../search-view-base.component';
import { FeedbackService } from 'src/app/shared/feedback.service';
import { AuthService, User } from 'src/app/core/auth.service';

@Component({
  templateUrl: './mysources-view.component.html',
  styleUrls: ['./mysources-view.component.scss']
})
export class MysourcesViewComponent extends SearchViewBaseComponent {
  currentUser: User;
  selfRoute = ['mysources'];
  selfStaticState = {};

  constructor(
    private authService: AuthService,
    searchService: SearchService,
    bookmarkService: BookmarkLocalService,
    router: Router,
    route: ActivatedRoute,
    feedbackService: FeedbackService
  ) {
    super(searchService, bookmarkService, router, route, feedbackService);
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.selfStaticState = { staffers: [this.currentUser.id] };
    this.ngOnInitBase();
  }

  updateComponentSpecificUIState() {
    // nothing to do here
  }
}
