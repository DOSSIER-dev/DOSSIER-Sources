import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Source } from './source';

/**
 * Via registerActivity, a get request is made that can be used
 * to track statistics and time spent with a source.
 *
 * See micropage.component, which would be the component that uses this
 * service (it's deactivated currently).
 */
@Injectable({
  providedIn: 'root'
})
export class StatsService {
  constructor(private httpClient: HttpClient) {}
  registerActivity(embedId: string, event: string) {
    return this.httpClient.get<Source>(`/api/stats/event/${embedId}`, {
      params: { event: event }
    });
  }
}
