import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnChanges {
  @Input() element: FormControl;
  @Input() errors: { name: string; title: string }[] = [];
  @Input() serverErrors: {} = {};
  @Input() serverErrorField: string | string[];
  subs: Subscription;
  _serverErrors: string[];
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes) {
    if (changes.serverErrorField || changes.serverErrors) {
      const fields =
        typeof this.serverErrorField === 'string' ? [this.serverErrorField] : this.serverErrorField;
      this._serverErrors = [];
      const flattenedServerErrors = this._flattenErrors(this.serverErrors);
      if (!!flattenedServerErrors) {
        this._serverErrors = fields
          .map(field => (!!flattenedServerErrors[field] ? flattenedServerErrors[field] : []))
          .reduce((all, current) => current.concat(all), []);
      }
    }

    // When element changes, attach subscribers to detect changes
    if (changes.element || changes.errors) {
      if (this.element) {
        // Hide server errors if value of form field changes
        this.subs = this.element.valueChanges.subscribe(_ => (this._serverErrors = []));
      } else {
        if (this.subs) {
          this.subs.unsubscribe();
        }
      }
    }
  }

  get hasValidationErrors() {
    return !!this.element && this.element.invalid && (this.element.dirty || this.element.touched);
  }

  get hasServerErrors() {
    return this._serverErrors && this._serverErrors.length > 0;
  }

  private _flattenErrors(err) {
    function extractMsg(obj, path) {
      let finds = [];
      for (const k of Object.keys(obj)) {
        if (typeof obj[k] === 'object') {
          finds = finds.concat(extractMsg(obj[k], path.concat(k)));
        }
        if (typeof obj[k] === 'string') {
          finds.push([path.join('.'), obj[k]]);
        }
      }
      return finds;
    }

    const errors = !err ? [] : extractMsg(err, []);

    return errors.reduce((prev, cur) => {
      prev[cur[0]] = prev[cur[0]] ? prev[cur[0]].concat([cur[1]]) : [cur[1]];
      return prev;
    }, {});
  }
}
