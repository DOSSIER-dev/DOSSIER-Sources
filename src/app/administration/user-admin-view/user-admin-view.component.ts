import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, startWith, mergeMap, map } from 'rxjs/operators';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { Editable } from '../editable';
import { Staffer } from 'src/app/shared/staffer';
import { StafferService } from 'src/app/shared/staffer.service';
import { BackendErrorHandlerService } from 'src/app/shared/backend-error-handler.service';
import { UserAdminFormComponent } from '../user-admin-form/user-admin-form.component';

@Component({
  templateUrl: './user-admin-view.component.html',
  styleUrls: ['./user-admin-view.component.scss', './user-flextable.scss']
})
export class UserAdminViewComponent implements OnInit {
  filteredItems: Editable<Staffer>[] = [];
  newItem: Editable<Staffer>;
  searchInput: FormControl = new FormControl();
  // Triggers (re)load from the backend
  triggerLoad$ = new BehaviorSubject<boolean>(true);
  noCanAdd = false;

  @ViewChild(UserAdminFormComponent, { static: false }) activeForm: UserAdminFormComponent;
  errors: any;

  constructor(
    private stafferService: StafferService,
    private backendErrorHandler: BackendErrorHandlerService
  ) {}

  ngOnInit() {
    const searchString$ = this.searchInput.valueChanges.pipe(
      debounceTime(500),
      startWith('')
    );

    combineLatest(
      this.triggerLoad$.pipe(
        mergeMap(_ => this.stafferService.getList()),
        map(items => items.map(item => new Editable<Staffer>(item)))
      ),
      searchString$
    )
      .pipe(map(([items, query]) => this._filterAndSort(items, query)))
      .subscribe(items => (this.filteredItems = items));
  }

  _stafferFilter(item, query) {
    return [
      item.user.username.toLowerCase(),
      item.user.firstname.toLowerCase(),
      item.user.lastname.toLowerCase(),
      item.user.email.toLowerCase()
    ]
      .join(' ')
      .includes(query);
  }

  _filterAndSort(items, query) {
    const filteredItems = !!query
      ? items.filter(item => item.editing || this._stafferFilter(item.payload, query.toLowerCase()))
      : items;
    return filteredItems.sort((a, b) =>
      a.payload.user.username.localeCompare(b.payload.user.username)
    );
  }

  addItem() {
    this._setIsEditing(true);
    this._closeAllExcept(null);
    const staffer = <Staffer>{
      user: {
        id: undefined,
        username: '',
        firstname: '',
        lastname: '',
        email: ''
      },
      isActive: false,
      isManager: false
    };
    this.newItem = new Editable<Staffer>(staffer, true);
  }

  save(item) {
    if (item.payload.user.id) {
      this.stafferService.update(item.payload).subscribe(
        _ => this._resetState(),
        err => {
          this.errors = err.error;
          this.backendErrorHandler.processErrors(err);
        }
      );
    } else {
      this.stafferService.add(item.payload).subscribe(
        _ => this._resetState(),
        err => {
          this.errors = err.error;
          this.backendErrorHandler.processErrors(err);
        }
      );
    }
  }

  cancelEdit(item?) {
    if (item) {
      item.editing = false;
    }
    this.newItem = null;
    this._setIsEditing(false);
  }

  delete(item) {
    this.stafferService.delete(item.payload).subscribe(_ => this._resetState());
  }

  edit(item) {
    if (this._getFormDirtyState()) {
      // Don't allow cancel when edited
      return;
    }

    item.editing = true;
    this._closeAllExcept(item);
    this._setIsEditing(true);
  }

  _resetState() {
    this._setIsEditing(false);
    this.newItem = null;
    this.triggerLoad$.next(true);
  }

  _setIsEditing(editStatus: boolean) {
    this.noCanAdd = editStatus;
  }

  _closeAllExcept(item = null) {
    this.filteredItems
      .filter(v => !item || v.payload.user.id !== item.payload.user.id)
      .forEach(v => (v.editing = false));

    if (!!item) {
      this.cancelEdit();
    }
  }

  _getFormDirtyState() {
    return this.activeForm && this.activeForm.form.dirty;
  }

  canDeactivate() {
    return !this._getFormDirtyState();
  }

  getDeactivateContextElement() {
    return this.activeForm && this.activeForm.firstInput;
  }
}
