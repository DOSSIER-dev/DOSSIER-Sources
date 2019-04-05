import { Injectable } from '@angular/core';
import { FeedbackService } from './feedback.service';

@Injectable({
  providedIn: 'root'
})
export class BackendErrorHandlerService {
  constructor(public feedback: FeedbackService) {}

  showSucess(message?: string) {
    const msg = message || 'SHARED.MESSAGES.SUCCESS';
    this.feedback.showSuccess(msg);
  }

  processErrors(err) {
    const errors = this.flattenErrors(err);
    this.feedback.showError(errors.join(''));
  }

  private flattenErrors(err) {
    if (!err.error) {
      return [];
    }

    if (typeof err.error === 'string') {
      return [err.statusText + ' ' + err.error.slice(0, 128)];
    }

    function extractMsg(obj, path) {
      let finds = [];
      for (const k of Object.keys(obj)) {
        if (typeof obj[k] === 'object') {
          finds = finds.concat(extractMsg(obj[k], path.concat(k)));
        }
        if (typeof obj[k] === 'string') {
          finds.push(path.join('.') + ': ' + obj[k]);
        }
      }
      return finds;
    }

    return extractMsg(err.error, []);
  }
}
