import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsHomeComponent } from './statistics-home.component';
import { SourceViewsComponent } from './source-views/source-views.component';
import { SharedModule } from '../shared/shared.module';
import { InventoryComponent } from './inventory/inventory.component';

@NgModule({
  imports: [CommonModule, SharedModule, StatisticsRoutingModule, NgxChartsModule],
  declarations: [StatisticsHomeComponent, SourceViewsComponent, InventoryComponent]
})
export class StatisticsModule {}
