import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';
import { FeedbackService } from 'src/app/shared/feedback.service';

@Component({
  selector: 'app-reset-password-view',
  templateUrl: './reset-password-view.component.html',
  styles: [':host { width: 100%; }']
})
export class ResetPasswordViewComponent implements OnInit {
  resetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  errors: any[];

  constructor(private userService: UserService, private feedbackService: FeedbackService) {}

  ngOnInit() {}

  onSubmit() {
    if (!this.resetForm.valid) {
      return;
    }

    const email = this.resetForm.value.email;

    this.errors = [];
    this.userService.resetPassword(email).subscribe(
      _ => {
        this.feedbackService.showSuccess('RESETPASSWORD.REQUEST_SEND_SUCCESS');
        this.resetForm.reset();
      },
      err => {
        this.errors = err.error;
        this.feedbackService.showError('RESETPASSWORD.REQUEST_SEND_FAIL');
      }
    );
  }
}
