import { Component, OnInit, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-highlights',
  template: `
    <span *ngFor="let fragment of fragments" class="frag">
      <span class="firstcol-size"></span>
      <span [innerHtml]="fragment" class="highlight-ems"></span>
    </span>
  `,
  styleUrls: ['./highlights.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HighlightsComponent implements OnInit {
  @Input() fragments: string[] = [];
  constructor() {}
  ngOnInit() {}
}
