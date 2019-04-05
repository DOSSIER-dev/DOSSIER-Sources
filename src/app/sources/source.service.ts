import { Injectable } from '@angular/core';
import { Source } from './source';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  constructor(private httpClient: HttpClient) {}

  getSources() {
    return this.httpClient.get<Source[]>('/api/sources/sources/');
  }

  getSource(id: number) {
    return this.httpClient.get<Source>(`/api/sources/sources/${id}/`);
  }

  deleteSource(source: Source) {
    return this.httpClient.delete(`/api/sources/sources/${source.id}/`);
  }

  updateSource(source: Source) {
    return this.httpClient.put<Source>(`/api/sources/sources/${source.id}/`, source);
  }

  addSource(source: Source) {
    return this.httpClient.post<Source>(`/api/sources/sources/`, source);
  }
}
