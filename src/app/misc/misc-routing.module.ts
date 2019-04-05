import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth-guard.service';
import { ContentViewComponent } from '../content/content-view/content-view.component';
import { LoggedinRedirectService } from '../core/loggedin-redirect.service';
import { LoginViewComponent } from './login-view/login-view.component';
import { NotfoundViewComponent } from './notfound-view/notfound-view.component';
import { ResetPasswordConfirmViewComponent } from './reset-password-confirm-view/reset-password-confirm-view.component';
import { ResetPasswordViewComponent } from './reset-password-view/reset-password-view.component';
import { UserSettingsViewComponent } from './user-settings-view/user-settings-view.component';

const miscRoutes: Routes = [
  {
    path: 'login',
    component: LoginViewComponent
  },

  {
    path: 'usersettings',
    component: UserSettingsViewComponent,
    canActivate: [AuthGuard]
  },
  { path: 'reset-password', component: ResetPasswordViewComponent },
  {
    path: 'reset-password-confirm/:uid/:token',
    component: ResetPasswordConfirmViewComponent
  },

  {
    path: '',
    component: ContentViewComponent,
    data: { contentName: 'index' },
    pathMatch: 'full',
    canActivate: [LoggedinRedirectService]
  },

  // html(markdown) content only
  {
    path: 'sources-in-your-org',
    component: ContentViewComponent,
    data: { contentName: 'sources-in-your-org' }
  },
  {
    path: 'about',
    component: ContentViewComponent,
    data: { contentName: 'about' }
  },
  {
    path: 'help',
    component: ContentViewComponent,
    data: { contentName: 'help' }
  },

  // Must be defined last
  { path: '**', component: NotfoundViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(miscRoutes)],
  exports: [RouterModule]
})
export class MiscRoutingModule {}
