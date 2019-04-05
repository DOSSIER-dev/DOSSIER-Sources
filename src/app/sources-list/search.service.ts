import { Injectable } from '@angular/core';
import { SearchResult } from './search-result';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ParamMap } from '@angular/router';

export class SearchState {
  query = '';
  page: number;
  sortkey = ''; // not specified devaults to 'by relevance'
  tags: string[] = [];
  stories: string[] = [];
  collections: string[] = [];
  staffers: string[] = [];
  sourcetypes: string[] = [];
}

export interface UrlSearchState {
  _s_q?: string;
  _s_pg?: number;
  _s_col?: string[];
  _s_sort?: string;
  _s_tag?: string[];
  _s_story?: string[];
  _s_staf?: string[];
  _s_type?: string[];
}

/**
 * Service that allows to query backend search (list endpoint).
 *
 * - Interface to the search state.
 * - Transforms search state to a query to the backend.
 * - Serialization / deserialization of search state to an url param map-
 *
 */
@Injectable()
export class SearchService {
  state = new SearchState();
  state$ = new BehaviorSubject<SearchState>(new SearchState());

  constructor(private httpClient: HttpClient) {}

  /**
   * Reset the search state.
   */
  clear() {
    this.state = new SearchState();
  }

  updateSearch(search: string) {
    this.state.query = search;
    this.state.page = null;
  }

  updatePage(page: number) {
    this.state.page = page;
  }

  updateSort(sortkey: string) {
    this.state.sortkey = sortkey;
    this.state.page = null;
  }

  updateTags(tags: any[]) {
    this.state.tags = tags;
    this.state.page = null;
  }

  updateStories(stories: any[]) {
    this.state.stories = stories;
    this.state.page = null;
  }

  updateCollections(collections: any[]) {
    this.state.collections = collections;
    this.state.page = null;
  }

  updateStaffers(staffers: any[]) {
    this.state.staffers = staffers.map(v => '' + v);
    this.state.page = null;
  }

  updateSourcetypes(sourcetypes: string[]) {
    this.state.sourcetypes = sourcetypes;
    this.state.page = null;
  }

  /**
   * Query backend using the current fiter settings.
   */
  doSearch(): Observable<SearchResult> {
    return this.query(this.state);
  }

  /**
   * Query backend and provide the filter settings as a parameter.
   */
  query(state?: SearchState) {
    const q = state || new SearchState();
    return this.transformState(q); // return a cold observable search query
  }

  getSortKey() {
    return this.state.sortkey;
  }

  getState() {
    return this.state;
  }

  emitState(addState?) {
    const extra = addState || {};
    const state = Object.assign({}, this.state, extra);
    this.state$.next(state); // emit new state
  }

  /**
   * Serialize the state for query string.
   */
  serializeState(searchState?: SearchState) {
    const state = searchState || this.state;
    const serialized: UrlSearchState = {};
    if (!!state.query) {
      serialized._s_q = state.query;
    }
    if (state.collections && state.collections.length > 0) {
      serialized._s_col = state.collections;
    }
    if (state.tags && state.tags.length > 0) {
      serialized._s_tag = state.tags;
    }
    if (state.stories && state.stories.length > 0) {
      serialized._s_story = state.stories;
    }
    if (state.staffers && state.staffers.length > 0) {
      serialized._s_staf = state.staffers;
    }
    if (state.sourcetypes && state.sourcetypes.length > 0) {
      serialized._s_type = state.sourcetypes;
    }
    if (!!state.sortkey) {
      serialized._s_sort = state.sortkey;
    }
    if (!!state.page) {
      serialized._s_pg = state.page;
    }
    return serialized;
  }

  loadSerializedState(params: ParamMap) {
    this.clear();
    if (params.has('_s_q')) {
      this.updateSearch(params.get('_s_q'));
    }
    if (params.has('_s_col')) {
      this.updateCollections(params.getAll('_s_col'));
    }
    if (params.has('_s_tag')) {
      this.updateTags(params.getAll('_s_tag'));
    }
    if (params.has('_s_story')) {
      this.updateStories(params.getAll('_s_story'));
    }
    if (params.has('_s_staf')) {
      this.updateStaffers(params.getAll('_s_staf'));
    }
    if (params.has('_s_type')) {
      this.updateSourcetypes(params.getAll('_s_type'));
    }
    if (params.has('_s_sort')) {
      this.updateSort(params.get('_s_sort'));
    }
    if (params.has('_s_pg')) {
      this.updatePage(parseInt(params.get('_s_pg')) || null);
    }
    return this.state;
  }

  transformState(state: SearchState): Observable<SearchResult> {
    let url = '/api/sources/search/';
    let params = [];

    if (!!state.query) {
      const terms = state.query.split(' ').filter(term => term != '');
      if (terms.length == 1) {
        params.push('search_multi_match=' + terms[0]);
      } else {
        params = params.concat(terms.map(term => 'search=' + term));
      }
    }

    if (!!state.sortkey) {
      params.push('ordering=' + state.sortkey);
    }

    if (!!state.page) {
      params.push('page=' + state.page);
    }

    if (state.tags.length > 0) {
      const parts = state.tags.map(v => 'tags__in=' + v);
      params.push(...parts);
    }

    if (state.stories.length > 0) {
      const parts = state.stories.map(v => 'stories__in=' + v);
      params.push(...parts);
    }

    if (state.collections.length > 0) {
      const query = state.collections.join('__');
      params.push('collection__in=' + query);
    }

    if (state.staffers.length > 0) {
      const query = state.staffers.join('__');
      params.push('owner__in=' + query);
    }

    if (state.sourcetypes.length > 0) {
      const query = state.sourcetypes.map(v => v.toLowerCase()).join('__');
      params.push('sourcetype__in=' + query);
    }

    // TOOD: page parameter

    if (params.length > 0) {
      url = url + '?' + params.join('&');
    }

    return this.httpClient.get<SearchResult>(url).pipe(catchError(err => of(new SearchResult())));
  }
}
