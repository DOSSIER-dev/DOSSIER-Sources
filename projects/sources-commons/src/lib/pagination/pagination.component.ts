import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { map, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() page: number;
  @Input() numPages: number;
  @Output() gotoPage = new EventEmitter<number>();

  isEnabled = false;
  hasPrev = true;
  hasNext = true;
  _pageValue = '';

  keepNumsRegex = /[^\d]/gi;
  @ViewChild('pageInputField') pageInputField;
  pageKeyInputs$ = new Subject<string>();

  constructor() { }

  ngOnInit() {
    this._setupPagenumberInput();
  }

  ngOnChanges(_: SimpleChanges) {
    this._pageValue = this.page ? '' + this.page : '';
    this._updateButtonStates();
  }

  /**
   * Setting a new value for the page.
   * Emits new output value if necessary.
   * @param page
   */
  setPage(page: number) {
    if (page < 1) {
      page = 1;
    } else if (page >= this.numPages) {
      page = this.numPages;
    }
    if (page != this.page) {
      this.page = page;
      this.gotoPage.emit(page);
      this._updateButtonStates();
    }
    this._pageValue = '' + this.page;
  }

  nextPage() {
    if (this.page < this.numPages) {
      this.setPage(this.page + 1);
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.setPage(this.page - 1);
    }
  }

  _updateButtonStates() {
    this.hasPrev = this.page && this.page > 1;
    this.hasNext = this.page && this.page < this.numPages;
    this.isEnabled = this.hasNext || this.hasPrev;
  }

  pageKeyUp($event) {
    this.pageKeyInputs$.next($event.key);
    $event.stopPropagation();
  }

  private _setupPagenumberInput() {
    this.pageKeyInputs$
      .pipe(
        map(key => {
          // Cleanup the input (numbers only)
          const current = +(this._pageValue.replace(this.keepNumsRegex, ''));
          // Up and Down arrow can be used to decrement / increment
          const next = key === 'ArrowUp'
            ? current - 1 : (key === 'ArrowDown' ? current + 1 : current);
          return next;
        }),
        debounceTime(300)
      )
      .subscribe(pageNum => {
        let input = +pageNum || +this._pageValue;
        if (!isNaN(input)) {
          input = Math.min(this.numPages, Math.max(1, input));
          this.setPage(input);
        } else {
          this._pageValue = '' + this.page;
        }

        // After form field value is updated, select the contents
        setTimeout(() => {
          this.pageInputField.nativeElement.select();
        }, 0);
      });
  }
}
