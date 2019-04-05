import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth-guard.service';
import { SearchViewComponent } from './search-view/search-view.component';
import { TagsViewComponent } from './tags-view/tags-view.component';
import { StoriesViewComponent } from './stories-view/stories-view.component';
import { CollectionsViewComponent } from './collections-view/collections-view.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { TypesViewComponent } from './types-view/types-view.component';
import { MysourcesViewComponent } from './mysources-view/mysources-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookmarkViewComponent } from './bookmark-view/bookmark-view.component';

const sourceListRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchViewComponent, canActivate: [AuthGuard] },
  { path: 'tags', component: TagsViewComponent, canActivate: [AuthGuard] },
  { path: 'stories', component: StoriesViewComponent, canActivate: [AuthGuard] },
  { path: 'collections', component: CollectionsViewComponent, canActivate: [AuthGuard] },
  { path: 'type', component: TypesViewComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UsersViewComponent, canActivate: [AuthGuard] },
  { path: 'mysources', component: MysourcesViewComponent, canActivate: [AuthGuard] },
  { path: 'bookmarks', component: BookmarkViewComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(sourceListRoutes)],
  exports: [RouterModule]
})
export class SourcesListRoutingModule {}
