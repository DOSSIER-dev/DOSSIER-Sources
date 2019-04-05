import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-visibility-input',
  templateUrl: './visibility-input.component.html',
  styleUrls: ['./visibility-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VisibilityInputComponent),
      multi: true
    }
  ]
})
export class VisibilityInputComponent implements OnInit, ControlValueAccessor {
  public: boolean;
  _changeFunc;
  _touchFunc;

  constructor() {}

  ngOnInit() {}

  writeValue(value) {
    if (value === undefined || value === null) {
      this.public = undefined;
    }
    this.public = !!value;
  }

  _outputValue() {
    return this.public;
  }

  registerOnChange(fn) {
    this._changeFunc = fn;
  }

  registerOnTouched(fn) {
    this._touchFunc = fn;
  }

  setConfidential() {
    this.public = false;
    if (this._changeFunc) {
      this._changeFunc(this._outputValue());
    }
  }

  setPublic() {
    this.public = true;
    if (this._changeFunc) {
      this._changeFunc(this._outputValue());
    }
  }

  toggle() {
    this.public = !this.public;
    if (this._changeFunc) {
      this._changeFunc(this._outputValue());
    }
  }
}
