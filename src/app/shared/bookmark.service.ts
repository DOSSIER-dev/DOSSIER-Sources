import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Source } from '../sources/source';
import { Bookmark } from './bookmark';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  url = '/api/bookmarks/bookmark/';
  constructor(private httpClient: HttpClient) {}

  getBookmarks() {
    return this.httpClient.get<Bookmark[]>(this.url);
  }

  setBookmark(source: Source) {
    return this.httpClient.post<Bookmark>(this.url, { sourceId: source.id });
  }

  unsetBookmark(source: Source) {
    return this.httpClient.delete(this.url + source.id);
  }
}
