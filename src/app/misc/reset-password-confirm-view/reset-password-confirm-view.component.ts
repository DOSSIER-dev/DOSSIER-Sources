import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from 'src/app/shared/feedback.service';

@Component({
  templateUrl: './reset-password-confirm-view.component.html',
  styles: [':host { width: 100%; }']
})
export class ResetPasswordConfirmViewComponent implements OnInit {
  newPassword1Input: FormControl = new FormControl();
  newPassword2Input: FormControl = new FormControl();
  uid = '';
  token = '';
  errors: {};

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private feedbackService: FeedbackService
  ) {
    this.route.paramMap.subscribe(paramMap => {
      this.uid = paramMap.get('uid');
      this.token = paramMap.get('token');
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.errors = [];
    this.userService
      .resetPasswordConfirm(
        this.uid,
        this.token,
        this.newPassword1Input.value,
        this.newPassword2Input.value
      )
      .subscribe(
        _ => {
          // delete values from inputs.
          this.newPassword1Input.setValue('');
          this.newPassword2Input.setValue('');

          // message
          this.feedbackService.showSuccess('RESETPASSWORD.SUCCESS');

          // redirect to login form
          this.router.navigate(['login']);
        },
        err => {
          this.errors = err.error;
        }
      );
  }
}
