import { Component, OnInit, ViewChild } from '@angular/core';
import { Story } from '../../shared/story';
import { StoryService } from '../../shared/story.service';
import { FormControl } from '@angular/forms';
import { debounceTime, startWith, mergeMap, map } from 'rxjs/operators';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { Editable } from '../editable';
import { StoryFormComponent } from '../story-form/story-form.component';
import { CanComponentDeactivate } from 'src/app/core/can-deactivate.guard';

class ItemType extends Story {}

@Component({
  templateUrl: './stories.component.html',
  styles: [
    `
      :host {
        width: 100%;
      }
    `
  ]
})
export class StoriesComponent implements OnInit, CanComponentDeactivate {
  filteredItems: Editable<ItemType>[] = [];
  newItem: Editable<ItemType>;
  searchInput: FormControl = new FormControl();
  // Triggers (re)load from the backend
  triggerLoad$ = new BehaviorSubject<boolean>(true);
  noCanAdd = false;

  @ViewChild(StoryFormComponent, { static: false }) activeForm: StoryFormComponent;

  constructor(private itemService: StoryService) {}

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
    )
      .pipe(map(([items, query]) => this._filterAndSort(items, query)))
      .subscribe(items => (this.filteredItems = items));
  }

  _filterAndSort(items, query) {
    const filteredItems = !!query
      ? items.filter(
          editable =>
            editable.payload.name.toLowerCase().includes(query.toLowerCase()) || editable.editing
        )
      : items;
    return filteredItems.sort((a, b) => a.payload.name.localeCompare(b.payload.name));
  }

  addItem() {
    this._closeAllExcept(null);
    this._setIsEditing(true);
    this.newItem = new Editable<ItemType>(new ItemType(), true);
  }

  save(item) {
    if (item.payload.id) {
      this.itemService.update(item.payload).subscribe(_ => this._resetState());
    } else {
      this.itemService.add(item.payload).subscribe(_ => this._resetState());
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
    this.itemService.delete(item.payload).subscribe(_ => this._resetState());
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
