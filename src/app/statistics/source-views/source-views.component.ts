import { Component, OnInit } from '@angular/core';
import { StatsData, StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-source-views',
  templateUrl: './source-views.component.html',
  styleUrls: ['./source-views.component.scss']
})
export class SourceViewsComponent implements OnInit {
  dataSource: StatsData[];

  minDate: Date;
  maxDate: Date;

  // options for ngx-charts
  view: any[] = [700, 400];
  yAxisLabel = '';
  showYAxis = true;
  showXAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'STATS.LABEL.WEEK';
  showYAxisLabel = true;
  timeline = true;
  colorScheme = {
    domain: ['#17ADBD', '#EA5D36', '#03717C', '#B83B31']
  };
  autoScale = true;

  // config for what to unpack from backend data
  // define the names of the title and attributes
  config = [
    {
      title: 'Micropage',
      eventType: 'load'
    },
    {
      title: 'Embedded',
      eventType: 'prefetch'
    }
  ];

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit() {
    // get data from backend
    const request = this.statisticsService.getWeeklySums();
    request.subscribe(data => {
      this.dataSource = this.config.map(conf => ({
        name: conf.title,
        series: data
          .filter(v => v.eventType === conf.eventType)
          .map(v => ({
            name: new Date(v.date),
            value: v.views
          }))
      }));

      const minmax = this.statisticsService.getMinMaxDate(data);
      this.minDate = minmax.minDate;
      this.maxDate = minmax.maxDate;
    });
  }
}
