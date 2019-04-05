import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchViewComponent } from './search-view/search-view.component';
import { SharedModule } from '../shared/shared.module';
import { TagsViewComponent } from './tags-view/tags-view.component';
import { StoriesViewComponent } from './stories-view/stories-view.component';

import { SourceItemComponent } from './source-item/source-item.component';
import { RouterModule } from '@angular/router';
import { SearchService } from './search.service';
import { HighlightsComponent } from './source-item/highlights.component';
import { RankingSelectComponent } from './ranking-select.component';
import { CollectionsViewComponent } from './collections-view/collections-view.component';
import { SourcesListRoutingModule } from './sources-list-routing.module';
import { UsersViewComponent } from './users-view/users-view.component';
import { TypesViewComponent } from './types-view/types-view.component';
import { MysourcesViewComponent } from './mysources-view/mysources-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookmarkViewComponent } from './bookmark-view/bookmark-view.component';

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule, SourcesListRoutingModule],
  declarations: [
    CollectionsViewComponent,
    HighlightsComponent,
    RankingSelectComponent,
    SearchViewComponent,
    SourceItemComponent,
    TagsViewComponent,
    StoriesViewComponent,
    UsersViewComponent,
    TypesViewComponent,
    MysourcesViewComponent,
    DashboardComponent,
    BookmarkViewComponent
  ],
  providers: [SearchService]
})
export class SourcesListModule {}
