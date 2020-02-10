import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private snackBar: MatSnackBar, private translateService: TranslateService) {}

  showError(msg: string) {
    this.translateService.get(msg).subscribe(translated => {
      this.snackBar.open(translated, 'close');
    });
  }

  showSuccess(msg: string) {
    this.translateService.get(msg).subscribe(translated => {
      this.snackBar.open(translated, 'close', { duration: 2500 });
    });
  }
}
