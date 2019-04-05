import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryListService {
  resource$;
  url = '/assets/country-list/en/country.json';

  PINNED = ['AT', 'DE'];

  constructor(private http: HttpClient) {}

  getList(): Observable<{ name: string; code: string }[]> {
    if (!this.resource$) {
      this.resource$ = this.fetch().pipe(shareReplay(1));
    }
    return this.resource$;
  }

  fetch(): Observable<{ name: string; code: string }[]> {
    return this.http.get<{ [key: string]: string }>(this.url).pipe(
      map(countryMap => this._mapFromMapToList(countryMap)),
      map(countryList => this._customSort(countryList))
    );
  }

  lookupByCode(code: string) {
    return this.getList().pipe(map(list => list.find(v => v.code === code)));
  }

  private _mapFromMapToList(countryMap) {
    return Object.keys(countryMap).map(k => ({ code: k, name: countryMap[k] }));
  }

  private _customSort(countryList) {
    // Allows "pinning" some items by prefix with a string that will
    // sort them first.
    const customSortable = countryList.map(v =>
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
