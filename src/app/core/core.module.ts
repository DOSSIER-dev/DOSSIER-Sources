import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [AuthGuard, AuthService, UserService]
})
export class CoreModule {}
