import { Injectable } from '@angular/core';
import { Source } from './source';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  constructor(private httpClient: HttpClient) {}
  getSource(embedId: string) {
    return this.httpClient.get<Source>(`/api/sources/fetch/`, {
      params: { id: embedId }
    });
  }
}
