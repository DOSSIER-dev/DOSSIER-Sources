import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth-guard.service';
import { CollectionsComponent } from './collections/collections.component';
import { TagsComponent } from './tags/tags.component';
import { StoriesComponent } from './stories/stories.component';
import { AdministrationHomeComponent } from './administration-home.component';
import { UserAdminViewComponent } from './user-admin-view/user-admin-view.component';
import { OrganisationViewComponent } from './organisation-view/organisation-view.component';
import { CanDeactivateGuard } from '../core/can-deactivate.guard';

const adminRoutes: Routes = [
  {
    path: 'settings',
    component: AdministrationHomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'collections',
        component: CollectionsComponent,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'tags',
        component: TagsComponent,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'stories',
        component: StoriesComponent,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'users',
        component: UserAdminViewComponent,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'team',
        component: OrganisationViewComponent,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {}
