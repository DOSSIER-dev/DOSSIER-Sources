import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SourceViewComponent } from './source-view/source-view.component';
import { AuthGuard } from '../core/auth-guard.service';
import { CanDeactivateGuard } from '../core/can-deactivate.guard';

const sourceRoutes: Routes = [
  {
    path: 'source/add',
    component: SourceViewComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
    data: { add: 1 }
  },
  {
    path: 'source/:id',
    component: SourceViewComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'source/:id/edit',
    component: SourceViewComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'source/:id/annotation/:annotationId',
    component: SourceViewComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(sourceRoutes)],
  exports: [RouterModule]
})
export class SourcesRoutingModule {}
