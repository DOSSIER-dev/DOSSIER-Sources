import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Story } from './story';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  constructor(private httpClient: HttpClient) {}

  getList(): Observable<Story[]> {
    return this.httpClient.get<Story[]>(`/api/cats/stories/`);
  }

  getOne(id: number) {
    return this.httpClient.get<Story>(`/api/cats/stories/${id}/`);
  }

  delete(tag: Story) {
    return this.httpClient.delete(`/api/cats/stories/${tag.id}/`);
  }

  update(tag: Story) {
    return this.httpClient.put<Story>(`/api/cats/stories/${tag.id}/`, tag);
  }

  add(tag: Story) {
    return this.httpClient.post<Story>(`/api/cats/stories/`, tag);
  }
}
