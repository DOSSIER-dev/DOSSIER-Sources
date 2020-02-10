import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { Tag } from '../../shared/tag';
import { Editable } from '../editable';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html'
})
export class TagFormComponent implements OnInit, OnChanges {
  @Input() showLabels = false;
  @Input() showDelete = true;
  @Input() tag: Editable<Tag>;
  @Output() save = new EventEmitter<Editable<Tag>>();
  @Output() delete = new EventEmitter<Editable<Tag>>();
  @Output() cancel = new EventEmitter<Editable<Tag>>();

  @ViewChild('firstInput', { static: false }) firstInput;

  form = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  constructor() {}

  ngOnInit() {
    this._startEdit();
  }

  _startEdit() {
    const defaultFormVal = Object.assign(new Tag(), this.tag.payload);
    this.form.patchValue(defaultFormVal);
    setTimeout(() => {
      this.focus();
    }, 0);
  }

  ngOnChanges(changes) {
    if (changes.tag) {
      this._startEdit();
    }
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    Object.assign(this.tag.payload, this.form.value);
    this.save.emit(this.tag);
  }

  doDelete() {
    this.delete.emit(this.tag);
  }

  doCancel() {
    this.cancel.emit(this.tag);
  }

  focus() {
    this.firstInput.nativeElement.focus();
  }
}
