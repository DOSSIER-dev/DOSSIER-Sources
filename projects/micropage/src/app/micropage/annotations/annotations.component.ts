import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Annotation } from '../annotation';

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.scss']
})
export class AnnotationsComponent implements OnInit {
  @Input() annotations: Annotation[];
  @Input() direction = 'vertical';
  @Output() select = new EventEmitter<Annotation>();
  constructor() {}

  ngOnInit() {}

  selectAnnotation(annotation) {
    this.select.emit(annotation);
  }
}
