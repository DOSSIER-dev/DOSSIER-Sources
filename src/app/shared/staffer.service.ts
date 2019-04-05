import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Staffer } from './staffer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StafferService {
  url = '/api/cats/staffer/';

  constructor(private httpClient: HttpClient) {}

  getList(): Observable<Staffer[]> {
    return this.httpClient.get<Staffer[]>(this.url);
  }

  getOne(id: number) {
    return this.httpClient.get<Staffer>(this.url + id + '/');
  }

  delete(staffer: Staffer) {
    const uid = staffer.user.id;
    return this.httpClient.delete(this.url + uid + '/');
  }

  update(staffer: Staffer) {
    const uid = staffer.user.id;
    const data = this._getData(staffer);
    return this.httpClient.put<Staffer>(this.url + uid + '/', data);
  }

  add(staffer: Staffer) {
    const data = this._getData(staffer);
    return this.httpClient.post<Staffer>(this.url, data);
  }

  _getData(staffer: Staffer): {} {
    const emailNormalized = staffer.user.email.toLowerCase().trim();
    const data = {
      isActive: staffer.isActive,
      isManager: staffer.isManager,
      user: {
        email: emailNormalized,
        username: emailNormalized,
        firstname: staffer.user.firstname,
        lastname: staffer.user.lastname
      }
    };
    return data;
  }
}
