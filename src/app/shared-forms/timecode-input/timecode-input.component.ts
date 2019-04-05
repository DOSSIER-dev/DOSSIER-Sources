import { Component, OnInit, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-timecode-input',
  templateUrl: './timecode-input.component.html',
  styleUrls: ['./timecode-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimecodeInputComponent),
      multi: true
    }
  ]
})
export class TimecodeInputComponent implements OnInit {
  seconds: number;

  _hours = '';
  _minutes = '';
  _seconds = '';

  _changeFunc;
  _touchFunc;

  constructor() {}

  ngOnInit() {}

  select(ref) {
    ref.select();
  }

  writeValue(value) {
    this.seconds = value;
    this._setInputs(value);
  }

  registerOnChange(fn) {
    this._changeFunc = fn;
  }

  registerOnTouched(fn) {
    this._touchFunc = fn;
  }

  _setInputs(seconds) {
    const _m = Math.floor(seconds / 60);
    const s = seconds % 60;
    const h = Math.floor(_m / 60);
    const m = _m % 60;
    this._hours = ('00' + h).substr(-2, 2);
    this._minutes = ('00' + m).substr(-2, 2);
    this._seconds = ('00' + s).substr(-2, 2);
  }

  _updateFields() {
    this.seconds = this._parseSeconds();
    // set timcode-parts again (works as normalization)
    this._setInputs(this.seconds);

    if (this._changeFunc) {
      this._changeFunc(this.seconds);
    }
  }

  _parseSeconds() {
    return (
      Math.max(0, parseInt(this._hours) || 0) * 3600 +
      Math.max(0, parseInt(this._minutes) || 0) * 60 +
      Math.max(0, parseInt(this._seconds) || 0)
    );
  }
}
