import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from './tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  constructor(private httpClient: HttpClient) {}

  getList(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(`/api/cats/tags/`);
  }

  getOne(id: number) {
    return this.httpClient.get<Tag>(`/api/cats/tags/${id}/`);
  }

  delete(tag: Tag) {
    return this.httpClient.delete(`/api/cats/tags/${tag.id}/`);
  }

  update(tag: Tag) {
    return this.httpClient.put<Tag>(`/api/cats/tags/${tag.id}/`, tag);
  }

  add(tag: Tag) {
    return this.httpClient.post<Tag>(`/api/cats/tags/`, tag);
  }
}
