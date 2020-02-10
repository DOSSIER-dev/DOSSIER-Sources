import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { Editable } from '../editable';
import { Staffer } from 'src/app/shared/staffer';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-admin-form',
  templateUrl: './user-admin-form.component.html',
  styleUrls: ['./user-admin-form.component.scss', '../user-admin-view/user-flextable.scss']
})
export class UserAdminFormComponent implements OnInit, OnChanges {
  @Input() showLabels = false;
  @Input() showDelete = true;
  @Input() item: Editable<Staffer>;
  @Input() serverErrors;
  @Output() save = new EventEmitter<Editable<Staffer>>();
  @Output() delete = new EventEmitter<Editable<Staffer>>();
  @Output() cancel = new EventEmitter<Editable<Staffer>>();
  @Output() edit = new EventEmitter<Editable<Staffer>>();

  @ViewChild('firstInput', { static: true }) firstInput;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(150)]),
    firstname: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    lastname: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    isActive: new FormControl(false),
    isManager: new FormControl(false)
  });
  constructor() {}

  ngOnInit() {}

  startEdit() {
    this.form.patchValue({
      email: this.item.payload.user.email,
      firstname: this.item.payload.user.firstname,
      lastname: this.item.payload.user.lastname,
      isActive: this.item.payload.isActive,
      isManager: this.item.payload.isManager
    });
    this.item.editing = true;
    this.edit.emit(this.item);

    setTimeout(() => {
      this.focus();
    }, 0);
  }

  closeEdit() {
    this.item.editing = false;
  }

  ngOnChanges(changes) {
    if (changes.item) {
      if (this.item.editing) {
        this.startEdit();
      } else {
        this.closeEdit();
      }
    }
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const formValue = this.form.value;
    Object.assign(this.item.payload.user, {
      email: formValue.email,
      firstname: formValue.firstname,
      lastname: formValue.lastname
    });
    Object.assign(this.item.payload, {
      isActive: formValue.isActive,
      isManager: formValue.isManager
    });

    this.save.emit(this.item);
  }

  doDelete() {
    this.delete.emit(this.item);
  }

  doCancel() {
    this.cancel.emit(this.item);
    this.item.editing = false;
  }

  focus() {
    this.firstInput.nativeElement.focus();
  }
}
