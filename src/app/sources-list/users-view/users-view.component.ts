import { Component } from '@angular/core';
import { StafferService } from '../../shared/staffer.service';
import { map } from 'rxjs/operators';
import { SearchService, SearchState } from '../search.service';
import { SelectItem } from 'src/app/shared/selectlist/selectlist.component';
import { Router, ActivatedRoute } from '@angular/router';
import { BookmarkLocalService } from 'src/app/shared/bookmark-local.service';
import { UsernamePipe } from 'src/app/shared/username.pipe';
import { SearchViewBaseComponent } from '../search-view-base.component';
import { FeedbackService } from 'src/app/shared/feedback.service';

@Component({
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent extends SearchViewBaseComponent {
  usernamePipe = new UsernamePipe();
  selectedUsers: SelectItem[];
  users: { id: number; name: string }[] = [];
  selfRoute = ['user'];

  constructor(
    private stafferService: StafferService,
    searchService: SearchService,
    bookmarkService: BookmarkLocalService,
    router: Router,
    route: ActivatedRoute,
    feedbackService: FeedbackService
  ) {
    super(searchService, bookmarkService, router, route, feedbackService);
  }

  ngOnInit() {
    // Load available staffers
    this.stafferService
      .getList()
      .pipe(
        map(staffers =>
          staffers.map(staffer => {
            return {
              id: staffer.user.id,
              name: this.usernamePipe.transform(staffer.user)
            };
          })
        )
      )
      .subscribe(staffers => {
        this.users = staffers;

        // Update ui state after users have been loaded
        this.updateUIState(this.searchService.getState());
      });

    this.ngOnInitBase();
  }

  setUser(items) {
    // search service takes user ids
    const users = items.map(v => v.id);
    this.searchService.updateStaffers(users);
    this.updateRouter();
  }

  updateComponentSpecificUIState(state: SearchState) {
    this.selectedUsers = this.users
      .filter(v => state.staffers.indexOf('' + v.id) !== -1)
      .map(v => {
        return {
          id: '' + v.id,
          name: v.name
        };
      });
  }
}
