import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticsHomeComponent } from './statistics-home.component';
import { SourceViewsComponent } from './source-views/source-views.component';
import { AuthGuard } from '../core/auth-guard.service';
import { InventoryComponent } from './inventory/inventory.component';

const statsRoutes: Routes = [
  {
    path: 'stats',
    component: StatisticsHomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'inventory',
        component: InventoryComponent
      },
      {
        path: 'source-views',
        component: SourceViewsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(statsRoutes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule {}
