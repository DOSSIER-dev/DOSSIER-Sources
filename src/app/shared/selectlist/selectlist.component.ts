import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
  SimpleChanges,
  HostListener
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, startWith, map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';

export interface SelectItem {
  name: string;
  id: string;
}

interface CheckedItem extends SelectItem {
  _app_checked: boolean;
}

/*
 * (Multi) Select component.
 *
 * Allows to select one ore more items of a list. The component emits the list
 * of selected items whenever it changes.
 * The list can be filtered via an input field, some keyboard shortcuts exist.
 *
 * The input properties 'name' and 'code' refer to the attribute names of
 * the items used for title and id, respectively.
 *
 * The compnent is used for the sidebar selectlists (such as tags, stories) etc.
 * and could be simplified regarding its implementation (e.g an '_app_checked'
 * attribute is currently added to the items).
 */
@Component({
  selector: 'app-selectlist',
  templateUrl: './selectlist.component.html',
  styleUrls: ['./selectlist.component.scss']
})
export class SelectlistComponent implements OnInit, OnChanges {
  @Input() items: SelectItem[] = [];
  @Input() selected: SelectItem[] = [];
  @Input() compact = false;
  @Input() multi = true;
  @Input() filter = true;

  /**
   * Name of the attribute used as name/title.
   */
  @Input() name = 'name';

  /**
   * Name of the attribute used as code/id.
   */
  @Input() code = 'name';

  @Output() selection = new EventEmitter<SelectItem[]>();
  textInput: FormControl = new FormControl();

  // internal rep.
  _internalItems: CheckedItem[] = [];
  checkedItems$ = new BehaviorSubject<CheckedItem[]>([]);

  @HostListener('keyup', ['$event'])
  onKey($event) {
    switch ($event.key) {
      case 'Enter':
        this.chooseDefault();
        break;
      case 'Escape':
        this.textInput.setValue('');
        break;
    }
  }

  constructor() {}

  ngOnInit() {
    const queryString$ = this.textInput.valueChanges.pipe(
      debounceTime(200),
      startWith(''),
      map(v => v.toLowerCase())
    );

    const internal$ = combineLatest(queryString$, this.checkedItems$).pipe(
      map(([query, checkedList]) => {
        return checkedList.filter(item => this._filter(query, item));
      })
    );

    internal$.subscribe(v => {
      this._internalItems = v;
    });
  }

  ngOnChanges(_: SimpleChanges) {
    if (this.items) {
      let selectedNames = [];
      if (this.selected) {
        selectedNames = this.selected.map(v => v[this.code]);
      }
      this.checkedItems$.next(this._prepareInternalItems(this.items, selectedNames));
    }
  }

  select(item) {
    if (!this.multi) {
      if (!item._app_checked) {
        // previously unselected - have only the one checked
        this.checkedItems$.next(this._prepareInternalItems(this.items, [item[this.code]]));
      } else {
        // unselect all
        this.checkedItems$.next(this._prepareInternalItems(this.items, []));
      }
    } else {
      // change the item's state
      item._app_checked = !item._app_checked;
    }

    const checkedItems = this.checkedItems$.getValue().filter(itm => itm._app_checked);

    this.selection.next(checkedItems);
  }

  // choose the first item in list
  chooseDefault() {
    if (this._internalItems && this._internalItems.length > 0) {
      this.select(this._internalItems[0]);
    }
  }

  private _prepareInternalItems(items: SelectItem[], selectedNames: string[]) {
    const stringIds = selectedNames.map(v => '' + v);
    return items.map(item => {
      return Object.assign(
        {
          _app_checked: stringIds.indexOf('' + item[this.code]) !== -1
        },
        item
      );
    });
  }

  private _filter(query: string, item: {}) {
    const searchAttr = item[this.name];
    return searchAttr && searchAttr.toLowerCase().includes(query);
  }
}
