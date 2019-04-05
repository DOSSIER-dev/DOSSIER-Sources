import { Component, OnInit } from '@angular/core';
import { SearchService, SearchState } from '../../sources-list/search.service';
import { SourceItem } from '../../sources-list/source-item';
import { BookmarkLocalService } from '../../shared/bookmark-local.service';
import { StatisticsService } from 'src/app/statistics/statistics.service';
import { AuthService } from 'src/app/core/auth.service';

const MAX_RESULTS = 5;

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: any[];
  mySources: SourceItem[] = [];
  myBookmarks: SourceItem[] = [];
  constructor(
    private searchService: SearchService,
    private statisticsService: StatisticsService,
    private bookmarkService: BookmarkLocalService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.statisticsService.getUserDashboard().subscribe(v => {
      this.stats = [
        { value: v.sourcesTotal, title: 'STATS.FIGURES.SOURCES_CONTRIBUTED' },
        { value: v.viewsTotal, title: 'STATS.FIGURES.TOTAL_SOURCE_VIEWS' }
      ];
    });

    // Query user's sources
    const currentUser = this.authService.getCurrentUser();
    const userQuery = new SearchState();
    userQuery.staffers = ['' + currentUser.id];
    userQuery.sortkey = '-created';
    this.searchService.query(userQuery).subscribe(res => {
      this.mySources = (res.results || []).slice(0, MAX_RESULTS);
    });

    // Query user's bookmarked sources
    this.bookmarkService.getBookmarks().subscribe(bookmarks => {
      this.myBookmarks = bookmarks
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, MAX_RESULTS)
        .map(v => v.source);
    });
  }
}
