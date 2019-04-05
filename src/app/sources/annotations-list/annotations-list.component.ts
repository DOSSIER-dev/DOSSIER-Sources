import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Annotation } from '../../annotation/annotation';

@Component({
  selector: 'app-annotations-list',
  template: `
    <a class="item" *ngFor="let anno of annotations" (click)="selected(anno)">{{ anno.title }}</a>
  `,
  styleUrls: ['./annotations-list.component.scss']
})
export class AnnotationsListComponent implements OnInit {
  @Input() annotations: Annotation[];
  @Output() annotationSelected: EventEmitter<Annotation> = new EventEmitter<Annotation>();

  constructor() {}

  ngOnInit() {}

  selected(anno) {
    this.annotationSelected.emit(anno);
  }
}
