import { Injectable } from '@angular/core';
import { BookmarkService } from './bookmark.service';
import { Source } from '../sources/source';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, tap, publishReplay, refCount, startWith, mergeMap } from 'rxjs/operators';
import { SearchResult } from '../sources-list/search-result';
import { Bookmark } from './bookmark';

/**
 * Keeps local list of the user's bookmarks (initially loaded from
 * backend via BookmarkService), state changes of a source are handed off
 * to backend as well.
 * After every set or removal of a bookmark, a reload i triggered.
 *
 * Provides a method to add the bookmark status to
 * sources list / search results.
 */
@Injectable({
  providedIn: 'root'
})
export class BookmarkLocalService {
  bookmarksMap = {};
  bookmarksMap$;
  bookmarks$: Observable<Bookmark[]>;

  trigger$ = new Subject<number>();

  constructor(private bookmarkService: BookmarkService) {
    this.bookmarks$ = this.trigger$.pipe(
      startWith(1),
      mergeMap(_ => this.bookmarkService.getBookmarks()),
      publishReplay(1),
      refCount()
    );

    this.bookmarksMap$ = this.bookmarks$.pipe(map(this._buildMap));
    this.bookmarksMap$.subscribe(v => (this.bookmarksMap = v));
  }

  private _buildMap(bookmarks) {
    return bookmarks.reduce((prev, cur) => {
      prev[cur.sourceId] = true;
      return prev;
    }, {});
  }

  setBookmarkStatus(item: Source, bookmarkStatus: boolean) {
    const action = bookmarkStatus
      ? this.bookmarkService.setBookmark(item)
      : this.bookmarkService.unsetBookmark(item);
    action.subscribe(_ => this.trigger$.next(1));
  }

  getBookmarks(): Observable<Bookmark[]> {
    return this.bookmarks$;
  }

  /**
   * Get bookmark status for a source item.
   */
  getBookmarkStatus(item: Source) {
    return !!this.bookmarksMap[item.id];
  }

  /**
   * For the observable for the SearchResult, go over the source-items in
   * the result list and set the bookmark status.
   */
  transformResult(result: Observable<SearchResult>) {
    return combineLatest(result, this.bookmarksMap$).pipe(
      map(([res, bkmks]) => {
        if (res && res.results) {
          res.results.forEach(item => (item.bookmarked = !!bkmks[item.id]));
        }
        return res;
      })
    );
  }
}
