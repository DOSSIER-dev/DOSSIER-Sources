import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

export class StatsDataPoint {
  name: Date;
  value: Number;
}

export class StatsData {
  name: string;
  series: StatsDataPoint[];
}

export interface DateCount {
  date: Date;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private httpClient: HttpClient) {}

  getWeeklySums() {
    return this.httpClient.get<{ date: Date; views: number; eventType: string }[]>(
      `/api/stats/weeklysums/`
    );
  }

  getSourceStats(source: { id: number }) {
    return this.httpClient.get<{ hitsCount: number }>(`/api/stats/source/?id=${source.id}`);
  }

  getInventory() {
    return this.httpClient.get<{
      sources: DateCount[];
      tags: DateCount[];
      collections: DateCount[];
      stories: DateCount[];
    }>('/api/stats/inventory');
  }

  getUserDashboard() {
    return this.httpClient.get<any>('/api/stats/dashboard');
  }

  getMinMaxDate(series: {}[], attr = 'date'): { minDate: Date; maxDate: Date } {
    const minDate = moment(Math.min.apply(Math, series.map(item => new Date(item[attr])))).toDate();

    const maxDate = moment(Math.max.apply(Math, series.map(item => new Date(item[attr])))).toDate();

    return {
      minDate: minDate,
      maxDate: maxDate
    };
  }
}
