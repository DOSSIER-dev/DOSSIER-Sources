import { Component, OnInit } from '@angular/core';
import { StatsData, StatisticsService } from '../statistics.service';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest } from 'rxjs';
import { curveStepAfter } from 'd3';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  dataSource: StatsData[];

  view = [700, 400];

  showYAxis = true;
  yAxisLabel = '';
  showYAxisLabel = false;

  showXAxis = true;
  xAxisLabel = 'STATS.LABEL.WEEK';
  showXAxisLabel = true;

  curve = curveStepAfter;

  gradient = false;
  showLegend = true;
  timeline = true;
  colorScheme = {
    domain: ['#17ADBD', '#EA5D36', '#03717C', '#B83B31']
  };
  autoScale = true;

  minDate: Date;
  maxDate: Date;

  constructor(private statisticsService: StatisticsService, private translate: TranslateService) {}

  ngOnInit() {
    const translatedHeaders = this.translate.get([
      'STATS.FIGURES.SOURCES',
      'STATS.FIGURES.STORIES',
      'STATS.FIGURES.TAGS',
      'STATS.FIGURES.COLLECTIONS'
    ]);
    const inventoryRequest = this.statisticsService.getInventory();

    combineLatest(translatedHeaders, inventoryRequest).subscribe(([texts, data]) => {
      this.dataSource = [
        {
          name: texts['STATS.FIGURES.SOURCES'],
          series: this._mapSeriesAggregated(data.sources)
        },
        {
          name: texts['STATS.FIGURES.COLLECTIONS'],
          series: this._mapSeriesAggregated(data.collections)
        },
        {
          name: texts['STATS.FIGURES.STORIES'],
          series: this._mapSeriesAggregated(data.stories)
        },
        {
          name: texts['STATS.FIGURES.TAGS'],
          series: this._mapSeriesAggregated(data.tags)
        }
      ];

      const minmax = this.statisticsService.getMinMaxDate(
        data.sources.concat(data.tags).concat(data.collections)
      );
      this.minDate = minmax.minDate;
      this.maxDate = minmax.maxDate;
    });
  }

  /**
   * Map series, but aggregates all the values (sum up to that point in time)
   * @param series
   */
  private _mapSeriesAggregated(series) {
    const aggregatedSeries = series.reduce((cur, next) => {
      const agg = cur.length > 0 ? cur[cur.length - 1].value : 0;
      return cur.concat([{ name: new Date(next.date), value: agg + next.count }]);
    }, []);

    // Add today's data point
    aggregatedSeries.push({
      name: new Date(),
      value: aggregatedSeries.length > 0 ? aggregatedSeries[aggregatedSeries.length - 1].value : 0
    });
    return aggregatedSeries;
  }
}
