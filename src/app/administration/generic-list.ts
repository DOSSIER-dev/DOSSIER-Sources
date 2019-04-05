import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, startWith, mergeMap, map } from 'rxjs/operators';
import { combineLatest, BehaviorSubject, Observable } from 'rxjs';
import { Editable } from './editable';

interface GenericItemType {
  name: string;
  id: number;
}

interface GenericService<T> {
  getList(): Observable<T[]>;
  getOne(id: number): Observable<T>;
  add(item: T): Observable<T>;
  update(item: T): Observable<T>;
  delete(item: T): Observable<any>;
}

export class GenericListComponent implements OnInit {
  filteredItems: Editable<GenericItemType>[] = [];
  newItem: Editable<GenericItemType>;
  triggerLoad$ = new BehaviorSubject<boolean>(true);
  searchInput: FormControl = new FormControl();

  constructor(private itemService: GenericService<GenericItemType>) {}

  ngOnInit() {
    const searchString$ = this.searchInput.valueChanges.pipe(
      debounceTime(500),
      startWith('')
    );

    combineLatest(
      this.triggerLoad$.pipe(
        mergeMap(_ => this.itemService.getList()),
        map(items => items.map(item => new Editable<GenericItemType>(item)))
      ),
      searchString$
    ).subscribe(([items, query]) => {
      this.filteredItems = !!query
        ? items.filter(editable =>
            editable.payload.name.toLowerCase().includes(query.toLowerCase())
          )
        : items;
      this.filteredItems = this.filteredItems.sort((a, b) =>
        a.payload.name.localeCompare(b.payload.name)
      );
    });
  }

  addItem() {
    this._closeAllExcept(null);
    this.newItem = new Editable<GenericItemType>(<GenericItemType>{}, true);
  }

  save(item) {
    if (item.payload.id) {
      this.itemService.update(item.payload).subscribe(_ => {
        this.triggerLoad$.next(true);
      });
    } else {
      this.itemService.add(item.payload).subscribe(() => {
        this.newItem = null;
        this.triggerLoad$.next(true);
      });
    }
  }

  closeNew() {
    this.newItem = null;
  }

  delete(item) {
    this.itemService.delete(item.payload).subscribe(_ => {
      this.triggerLoad$.next(true);
    });
  }

  edit(item) {
    this._closeAllExcept(item);
  }

  _closeAllExcept(item = null) {
    this.filteredItems
      .filter(v => !item || v.payload.id !== item.payload.id)
      .forEach(v => (v.editing = false));

    if (!!item) {
      this.closeNew();
    }
  }
}
