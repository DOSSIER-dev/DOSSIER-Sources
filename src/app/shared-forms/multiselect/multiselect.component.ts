import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface SelectItem {
  name: string;
  id: string;
}

/**
 * Multiselect (with freely adding items)
 *
 * Select multiple values from a list.
 * Usable as a form element.
 * Uses autocomplete to filter the list.
 * Allows adding new items (not in the list) to the list.
 *
 * TODO: simplify more from refactoring (name/id not needed, internal
 *  items not needed, current value could directly be the checked items list)
 */
@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectComponent),
      multi: true
    }
  ]
})
export class MultiselectComponent implements OnInit, ControlValueAccessor {
  _items: SelectItem[] = [];
  _checkedItems: SelectItem[] = [];
  _internalItems: SelectItem[] = [];

  inputField = new FormControl();
  selectField = new FormControl();
  filteredOptions: Observable<SelectItem[]>;

  @Input() set items(items: SelectItem[]) {
    this._items = items;
    this._internalItems = this._setInternalItems();
  }
  get items() {
    return this._items;
  }

  _changeFunc;
  _touchFunc;

  name = 'name'; // the name of the 'name' attribute of the items
  code = 'id'; // the name of the code / id attribute

  constructor() {}

  writeValue(value: SelectItem[]) {
    this._checkedItems = value || [];
    this._internalItems = this._setInternalItems();
  }

  registerOnChange(fn) {
    this._changeFunc = fn;
  }

  registerOnTouched(fn) {
    this._touchFunc = fn;
  }

  ngOnInit() {
    this.filteredOptions = this.inputField.valueChanges.pipe(
      startWith(''),
      map(input => {
        const q = typeof input === 'string' ? input.toLowerCase() : '';
        const checkedIds = this._checkedItems.map(v => v[this.code]);
        return this._internalItems.filter(
          item =>
            checkedIds.indexOf(item[this.code]) === -1 && item.name.toLowerCase().indexOf(q) !== -1
        );
      })
    );
  }

  select(item) {
    const checkedIds = this._checkedItems.map(v => v[this.code]);
    const itemChecked = checkedIds.find(v => v === item[this.code]);
    if (itemChecked) {
      // Un-select
      this._checkedItems = this._checkedItems.filter(v => v[this.code] !== item[this.code]);
    } else {
      // Select
      this._checkedItems.push(item);
    }
    this._internalItems = this._setInternalItems();
    this._changeFunc(this._currentValue());
  }

  _setInternalItems() {
    const items = this._items || [];
    return items;
  }

  _currentValue() {
    const stringIds = (this._checkedItems || []).map(item => '' + item[this.code]);
    return this._items.filter(item => stringIds.indexOf('' + item[this.code]) !== -1);
  }

  _displayOption(option) {
    return option ? option.name : '';
  }

  _optionSelected(option) {
    this.select(option.option.value);
    this.inputField.setValue('');
  }

  onKeyPress($event) {
    switch ($event.key) {
      case 'Enter':
        const value = (this.inputField.value || '').trim();
        if (value !== '') {
          const option = this._createNewOption(value);
          this.select(option);
          this.inputField.setValue('');
        }
        // don't trigger form submit with enter
        $event.stopPropagation();
        $event.preventDefault();
        break;
    }
  }

  onKeyUp($event) {
    switch ($event.key) {
      // case "Backspace":  // don't use backspace for deleting tags
      //   // unselect last one
      //   if (this.inputField.value === '' && this._checkedItems.length > 0) {
      //     this.select(this._checkedItems[this._checkedItems.length-1]);
      //   }
      case 'Escape':
        this.inputField.setValue('');
        break;
    }
  }

  _createNewOption(name) {
    const option = {
      id: name, // temporarily create with id = name
      name: name
    };
    this._items.push(option);
    return option;
  }
}
