import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsComponent } from './collections/collections.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { CollectionFormComponent } from './collection-form/collection-form.component';
import { StoriesComponent } from './stories/stories.component';
import { StoryFormComponent } from './story-form/story-form.component';
import { TagsComponent } from './tags/tags.component';
import { TagFormComponent } from './tag-form/tag-form.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationHomeComponent } from './administration-home.component';
import { UserAdminViewComponent } from './user-admin-view/user-admin-view.component';
import { UserAdminFormComponent } from './user-admin-form/user-admin-form.component';
import { OrganisationViewComponent } from './organisation-view/organisation-view.component';
import { SharedFormsModule } from '../shared-forms/shared-forms.module';

@NgModule({
  imports: [CommonModule, SharedModule, SharedFormsModule, CoreModule, AdministrationRoutingModule],
  declarations: [
    AdministrationHomeComponent,
    CollectionsComponent,
    CollectionFormComponent,
    StoriesComponent,
    StoryFormComponent,
    TagsComponent,
    TagFormComponent,
    UserAdminViewComponent,
    UserAdminFormComponent,
    OrganisationViewComponent
  ]
})
export class AdministrationModule {}
