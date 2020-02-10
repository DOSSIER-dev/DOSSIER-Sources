import { OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchResult, SearchResultSummary } from './search-result';
import { of, combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, mergeMap, takeUntil } from 'rxjs/operators';
import { SearchService, SearchState } from './search.service';
import { BookmarkLocalService } from '../shared/bookmark-local.service';
import { RankingSelectComponent } from './ranking-select.component';
import { FeedbackService } from '../shared/feedback.service';

export interface DerivedSearchViewComponent extends OnInit {
  updateComponentSpecificUIState(state: SearchState);
}

/**
 * Base component for views that consist of a list of sources with
 * search input and (optionally) a selection of a category/metadata
 * facet in the sidebar.
 *
 * The child components have to implement/define `selfRoute` and
 * `updateComponentSpecificUIState(state)`, which updates the UI with the
 * current search state.
 *

 */
export class SearchViewBaseComponent implements DerivedSearchViewComponent, OnDestroy {
  @ViewChild(RankingSelectComponent, { static: true }) ranking: RankingSelectComponent;
  searchInput: FormControl = new FormControl();

  // Local search/ui state
  searchState: SearchState = new SearchState();
  searializedSearchState;
  currentResult = new SearchResult();
  currentResultSummary: SearchResultSummary;

  selfRoute = [];
  selfStaticState = {};

  unsubAll$ = new Subject<any>();

  constructor(
    protected searchService: SearchService,
    private bookmarkService: BookmarkLocalService,
    private router: Router,
    private route: ActivatedRoute,
    private feedbackService: FeedbackService
  ) {}

  setSearchStateFromRouteParams(staticParams, params) {
    // De-serialize search state
    this.searchService.loadSerializedState(params);
    this.searializedSearchState = this.searchService.serializeState();

    // Update search state
    this.searchService.emitState(staticParams);

    // Place to cange view's UI according to search state
    this.updateUIState(this.searchService.getState());
  }

  ngOnInit() {
    throw new Error(`Implement ngOnInit(), which must contain at least the
      all ngOnInitBase().`);
  }

  ngOnDestroy() {
    this.unsubAll$.next('');
  }

  /**
   * Set up default ui events.
   */
  ngOnInitBase() {
    // UI Event listeners
    this._setUpDefaultInputs();

    // Pick search state from the route/url (combined with the static state),
    // and set the
    combineLatest(this._getStaticState(), this.route.queryParamMap).subscribe(
      ([staticParams, params]) => {
        this.setSearchStateFromRouteParams(staticParams, params);
      }
    );

    // React to changes in search state with a new search query
    const searchQuery$ = this.searchService.state$.pipe(
      debounceTime(50),
      mergeMap(state => this.searchService.transformState(state))
    );

    // Add bookmark state to result list and update result
    this.bookmarkService
      .transformResult(searchQuery$)
      .pipe(takeUntil(this.unsubAll$))
      .subscribe(
        result => {
          this.currentResult = result;
          this.currentResultSummary = new SearchResultSummary(result);
        },
        _ => {
          this.currentResultSummary = new SearchResultSummary(0);
          this.feedbackService.showError('SHARED.MESSAGES.GET_ERROR');
        }
      );
  }

  /**
   * Add listeners to default input events that are present
   * on every search view.
   */
  protected _setUpDefaultInputs() {
    // React to keystrokes / search-query
    this.searchInput.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.unsubAll$)
      )
      .subscribe(query => this.setSearch(query));

    // React to sort order change
    this.ranking.changed
      .pipe(takeUntil(this.unsubAll$))
      .subscribe(sortKey => this.setRanking(sortKey));
  }

  /**
   * Some components require that some static settings are put into
   * the search state for every request.
   * These settings are defined in this.selfStaticState retreived here
   */
  protected _getStaticState(): Observable<any> {
    return this.selfStaticState instanceof Observable
      ? this.selfStaticState
      : of(this.selfStaticState);
  }

  setSearch(query) {
    this.searchService.updateSearch(query);
    this.updateRouter();
  }

  setRanking(sortKey) {
    this.searchService.updateSort(sortKey);
    this.updateRouter();
  }

  setPage(page) {
    this.searchService.updatePage(page);
    this.updateRouter();
  }

  protected updateUIState(state: SearchState) {
    this.searchState = state;
    this.updateComponentSpecificUIState(state);
  }

  updateComponentSpecificUIState(state: SearchState) {
    throw new Error('Must implement updateComponentSpecificUIState');
  }

  protected updateRouter() {
    this.router.navigate(this.selfRoute, { queryParams: this.searchService.serializeState() });
  }
}
