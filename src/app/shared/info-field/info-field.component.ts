import { Component, Input } from '@angular/core';

/**
 * Display lable and content.
 * Hide everyhing if the content is empty.
 */
@Component({
  selector: 'app-info-field',
  templateUrl: './info-field.component.html',
  styleUrls: ['./info-field.component.scss']
})
export class InfoFieldComponent {
  _showField = true;

  /**
   * Depending on value (if value is empty), the whole block is hidden.
   */
  @Input() set value(value) {
    const undefinedOrEmpty =
      value === undefined || value === null || (value.length !== undefined && value.length === 0);

    this._showField = !undefinedOrEmpty;
  }
}
