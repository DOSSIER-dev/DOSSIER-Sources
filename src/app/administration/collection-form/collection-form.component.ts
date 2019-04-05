import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges
} from '@angular/core';
import { Collection } from '../collection';
import { Editable } from '../editable';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-collection-form',
  templateUrl: './collection-form.component.html'
})
export class CollectionFormComponent implements OnInit, OnChanges {
  @Input() showLabels = false;
  @Input() showDelete = true;
  @Input() collection: Editable<Collection>;
  @Output() save = new EventEmitter<Editable<Collection>>();
  @Output() delete = new EventEmitter<Editable<Collection>>();
  @Output() cancel = new EventEmitter<Editable<Collection>>();

  @ViewChild('firstInput') firstInput;

  form = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  constructor() {}

  ngOnInit() {
    this._startEdit();
  }

  _startEdit() {
    const defaultFormVal = Object.assign(new Collection(), this.collection.payload);
    this.form.patchValue(defaultFormVal);
    setTimeout(() => {
      this.focus();
    }, 0);
  }

  ngOnChanges(changes) {
    if (changes.collection) {
      this._startEdit();
    }
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    Object.assign(this.collection.payload, this.form.value);
    this.save.emit(this.collection);
  }

  doDelete() {
    this.delete.emit(this.collection);
  }

  doCancel() {
    this.cancel.emit(this.collection);
  }

  focus() {
    this.firstInput.nativeElement.focus();
  }
}
