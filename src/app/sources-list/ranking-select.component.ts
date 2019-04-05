import { Component, OnInit, EventEmitter, Output, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-ranking-select',
  template: `
    <div class="container">
      <label translate="SHARED.RANKING.LABEL"></label>
      <input
        type="text"
        readonly
        (click)="expanded = !expanded"
        class="option"
        [value]="getTitle(val) | translate"
      />
      <div *ngIf="expanded" class="options">
        <a
          *ngFor="let v of values"
          class="option"
          (click)="choose(v.sortkey)"
          [ngClass]="{ selected: val === v.sortkey, preselect: internal === v.sortkey }"
          [translate]="v.title"
        ></a>
      </div>
    </div>
  `,
  styles: [
    `
      .option {
        display: block;
        cursor: pointer;
      }
    `,
    `
      .selected {
        font-weight: bold;
      }
    `,
    `
      .preselect {
        background: #f0f0f0;
      }
    `,
    `
      .container {
        position: relative;
      }
    `,
    `
      .options {
        position: absolute;
        background: white;
        padding: 1em;
        width: 100%;
        border: 1px solid #999;
      }
    `
  ]
})
export class RankingSelectComponent implements OnInit {
  expanded = false;

  values = [
    { sortkey: '', title: 'SHARED.RANKING.BY_RELEVANCE' },
    { sortkey: 'title', title: 'SHARED.RANKING.BY_TITLE_ASC' },
    { sortkey: '-title', title: 'SHARED.RANKING.BY_TITLE_DESC' },
    { sortkey: 'created', title: 'SHARED.RANKING.BY_DATE_ASC' },
    { sortkey: '-created', title: 'SHARED.RANKING.BY_DATE_DESC' }
  ];

  lookup = {};

  val = '';
  internal = '';

  @HostListener('keyup', ['$event'])
  onKey($event) {
    switch ($event.key) {
      case 'ArrowDown':
        this.previousChoice();
        break;
      case 'ArrowUp':
        this.nextChoice();
        break;
      case 'Enter':
        this.choose(this.internal);
        break;
      case 'Escape':
        this.internal = this.val;
        this.expanded = false;
        break;
    }
  }

  @Output() changed: EventEmitter<string> = new EventEmitter<string>();
  @Input() set value(v: string) {
    this.val = v;
    this.internal = v;
  }

  constructor() {}

  ngOnInit() {
    this.lookup = this.values.reduce((acc, cur) => {
      acc[cur.sortkey] = cur.title;
      return acc;
    }, {});
  }

  choose(v) {
    this.value = v;
    this.expanded = false;
    this.changed.emit(v);
  }

  getTitle(sortKey) {
    return this.lookup[sortKey] || '';
  }

  nextChoice() {
    const index = this.values.findIndex(v => v.sortkey === this.internal) || 0;
    const newIndex = Math.min(Math.max(0, index - 1), this.values.length - 1);
    this.internal = this.values[newIndex].sortkey;
  }

  previousChoice() {
    const index = this.values.findIndex(v => v.sortkey === this.internal) || 0;
    const newIndex = Math.min(Math.max(0, index + 1), this.values.length - 1);
    this.internal = this.values[newIndex].sortkey;
  }
}
