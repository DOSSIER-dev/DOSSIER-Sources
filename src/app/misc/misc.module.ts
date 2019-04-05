import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginViewComponent } from './login-view/login-view.component';
import { NotfoundViewComponent } from './notfound-view/notfound-view.component';
import { UserSettingsViewComponent } from './user-settings-view/user-settings-view.component';
import { ResetPasswordViewComponent } from './reset-password-view/reset-password-view.component';
import { RouterModule } from '@angular/router';
import { ResetPasswordConfirmViewComponent } from './reset-password-confirm-view/reset-password-confirm-view.component';
import { MiscRoutingModule } from './misc-routing.module';
import { SharedFormsModule } from '../shared-forms/shared-forms.module';
import { ContentModule } from '../content/content.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MiscRoutingModule,
    SharedModule,
    ContentModule,
    SharedFormsModule
  ],
  declarations: [
    LoginViewComponent,
    NotfoundViewComponent,
    UserSettingsViewComponent,
    ResetPasswordViewComponent,
    ResetPasswordConfirmViewComponent
  ],
  providers: []
})
export class MiscModule {}
