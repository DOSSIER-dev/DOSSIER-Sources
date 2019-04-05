import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/shared/feedback.service';
import { AuthService } from 'src/app/core/auth.service';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-user-settings-view',
  templateUrl: './user-settings-view.component.html',
  styleUrls: ['./user-settings-view.component.scss']
})
export class UserSettingsViewComponent implements OnInit {
  passwordForm = new FormGroup({
    oldPassword: new FormControl(),
    newPassword1: new FormControl(),
    newPassword2: new FormControl()
  });

  nameForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl('')
  });

  errors: any[];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit() {
    this.nameForm.patchValue(this.authService.getCurrentUser());
  }

  onSubmit() {
    // For (just) the first control that is found to be invalid, yet still
    // in pristine state, mark it as touched. Plays a role when empty and
    // untouched forms are submitted.
    for (const k of Object.keys(this.passwordForm.controls)) {
      const control = this.passwordForm.controls[k];
      if (control.pristine && control.invalid) {
        control.markAsTouched();
        break;
      }
    }

    if (!this.passwordForm.valid) {
      return false;
    }

    const formValue = this.passwordForm.value;

    this.errors = [];
    this.userService
      .setPassword(formValue.oldPassword, formValue.newPassword1, formValue.newPassword2)
      .subscribe(
        _ => {
          this.feedbackService.showSuccess('RESETPASSWORD.SUCCESS');

          // delete values from inputs.
          this.passwordForm.reset();
        },
        err => {
          this.errors = err.error;
          this.feedbackService.showError('RESETPASSWORD.FAIL');
        }
      );
  }

  submitName() {
    // For (just) the first control that is found to be invalid, yet still
    // in pristine state, mark it as touched. Plays a role when empty and
    // untouched forms are submitted.
    for (const k of Object.keys(this.nameForm.controls)) {
      const control = this.nameForm.controls[k];
      if (control.pristine && control.invalid) {
        control.markAsTouched();
        break;
      }
    }

    if (!this.nameForm.valid) {
      return false;
    }

    const formValue = this.nameForm.value;
    this.userService.setPersonalData(formValue.firstname, formValue.lastname).subscribe(
      _ => {
        this.feedbackService.showSuccess('SETTINGS.PERSONAL.SUCCESS');
        this.authService.updateCurrentUser().subscribe(user => this.nameForm.patchValue(user));
      },
      err => {
        this.errors = err.error;
        this.feedbackService.showError('SETTINGS.PERSONAL.FAIL');
      }
    );
  }
}
