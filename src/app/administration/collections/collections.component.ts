import { Component, OnInit, ViewChild } from '@angular/core';
import { CollectionsService } from '../collections.service';
import { Collection } from '../collection';
import { FormControl } from '@angular/forms';
import { debounceTime, startWith, mergeMap, map } from 'rxjs/operators';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { Editable } from '../editable';
import { CollectionFormComponent } from '../collection-form/collection-form.component';
import { CanComponentDeactivate } from 'src/app/core/can-deactivate.guard';

class ItemType extends Collection {}

/**
 * Manage a list of items.
 *
 * Can add, update, delete items.
 * Every time data is changed, a relod is triggered via the tirggerLoad$
 * subject.
 *
 */
@Component({
  templateUrl: './collections.component.html',
  styles: [
    `
      :host {
        width: 100%;
      }
    `
  ]
})
export class CollectionsComponent implements OnInit, CanComponentDeactivate {
  filteredItems: Editable<ItemType>[] = [];
  newItem: Editable<ItemType>;
  searchInput: FormControl = new FormControl();

  // Triggers (re)load from the backend
  triggerLoad$ = new BehaviorSubject<boolean>(true);

  noCanAdd = false;

  @ViewChild(CollectionFormComponent) activeForm: CollectionFormComponent;

  constructor(private itemService: CollectionsService) {}

  ngOnInit() {
    const searchString$ = this.searchInput.valueChanges.pipe(
      debounceTime(500),
      startWith('')
    );

    combineLatest(
      this.triggerLoad$.pipe(
        mergeMap(_ => this.itemService.getList()),
        map(items => items.map(item => new Editable<ItemType>(item)))
      ),
      searchString$
    ).subscribe(([items, query]) => {
      this.filteredItems = !!query
        ? items.filter(
            editable =>
              editable.payload.name.toLowerCase().includes(query.toLowerCase()) || editable.editing
          )
        : items;
      this.filteredItems = this.filteredItems.sort((a, b) =>
        a.payload.name.localeCompare(b.payload.name)
      );
    });
  }

  addItem() {
    this._closeAllExcept(null);
    this._setIsEditing(true);
    this.newItem = new Editable<ItemType>(new ItemType(), true);
  }

  save(item) {
    if (item.payload.id) {
      this.itemService.update(item.payload).subscribe(_ => {
        this.triggerLoad$.next(true);
        this._setIsEditing(false);
      });
    } else {
      this.itemService.add(item.payload).subscribe(_ => {
        this.newItem = null;
        this.triggerLoad$.next(true);
        this._setIsEditing(false);
      });
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
    this.itemService.delete(item.payload).subscribe(_ => {
      this.triggerLoad$.next(true);
      this._setIsEditing(false);
    });
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

  _setIsEditing(editStatus: boolean) {
    this.noCanAdd = editStatus;
  }

  _closeAllExcept(item = null) {
    this.filteredItems
      .filter(v => !item || v.payload.id !== item.payload.id)
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
