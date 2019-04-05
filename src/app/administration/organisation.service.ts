import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Organisation {
  id: number;
  name: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  url = '/api/cats/organisation/';

  constructor(private httpClient: HttpClient) {}

  getList(): Observable<Organisation[]> {
    return this.httpClient.get<Organisation[]>(this.url);
  }

  getOne(id: number) {
    return this.httpClient.get<Organisation>(this.url + id + '/');
  }

  delete(staffer: Organisation) {
    return this.httpClient.delete(this.url + staffer.id + '/');
  }

  update(staffer: Organisation) {
    return this.httpClient.put<Organisation>(this.url + staffer.id + '/', staffer);
  }

  add(staffer: Organisation) {
    return this.httpClient.post<Organisation>(this.url, staffer);
  }
}
