import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguageListService {
  resource$;
  url = '/assets/language-list/en/language.json';

  PINNED = ['de', 'en'];

  constructor(private http: HttpClient) {}

  getList(): Observable<{ name: string; code: string }[]> {
    if (!this.resource$) {
      this.resource$ = this.fetch().pipe(shareReplay(1));
    }
    return this.resource$;
  }

  fetch(): Observable<{ name: string; code: string }[]> {
    return this.http.get<{ [key: string]: string }>(this.url).pipe(
      map(langMap => this._mapFromMapToList(langMap)),
      map(langList => this._customSort(langList))
    );
  }

  lookupByCode(code: string) {
    return this.getList().pipe(map(list => list.find(v => v.code === code)));
  }

  private _mapFromMapToList(langMap) {
    return Object.keys(langMap).map(k => ({ code: k, name: langMap[k] }));
  }

  private _customSort(langList) {
    // Allows "pinning" some items by prefix with a string that will
    // sort them first.
    const customSortable = langList.map(v =>
      Object.assign(v, { sortname: (this.PINNED.indexOf(v.code) !== -1 ? 'AAA' : '') + v.name })
    );
    return customSortable
      .sort((a, b) => this._customCompare(a, b))
      .map(v => ({ code: v.code, name: v.name }));
  }

  private _customCompare(a, b) {
    return a.sortname.localeCompare(b.sortname);
  }
}
