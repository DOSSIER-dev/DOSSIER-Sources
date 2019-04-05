import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collection } from './collection';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  constructor(private httpClient: HttpClient) {}

  getList() {
    return this.httpClient.get<Collection[]>('/api/cats/collections/');
  }

  getOne(id: number) {
    return this.httpClient.get<Collection>(`/api/cats/collections/${id}/`);
  }

  delete(collection: Collection) {
    return this.httpClient.delete(`/api/cats/collections/${collection.id}/`);
  }

  update(collection: Collection) {
    return this.httpClient.put<Collection>(`/api/cats/collections/${collection.id}/`, collection);
  }

  add(collection: Collection) {
    return this.httpClient.post<Collection>(`/api/cats/collections/`, collection);
  }
}
