import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { Story } from '../../shared/story';
import { Editable } from '../editable';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html'
})
export class StoryFormComponent implements OnInit, OnChanges {
  @Input() showLabels = false;
  @Input() showDelete = true;
  @Input() story: Editable<Story>;
  @Output() save = new EventEmitter<Editable<Story>>();
  @Output() delete = new EventEmitter<Editable<Story>>();
  @Output() cancel = new EventEmitter<Editable<Story>>();

  @ViewChild('firstInput', { static: false }) firstInput;

  form = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  constructor() {}

  ngOnInit() {
    this._startEdit();
  }

  _startEdit() {
    const defaultFormVal = Object.assign(new Story(), this.story.payload);
    this.form.patchValue(defaultFormVal);
    setTimeout(() => {
      this.focus();
    }, 0);
  }

  ngOnChanges(changes) {
    if (changes.story) {
      this._startEdit();
    }
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    Object.assign(this.story.payload, this.form.value);
    this.save.emit(this.story);
  }

  doDelete() {
    this.delete.emit(this.story);
  }

  doCancel() {
    this.cancel.emit(this.story);
  }

  focus() {
    this.firstInput.nativeElement.focus();
  }
}
