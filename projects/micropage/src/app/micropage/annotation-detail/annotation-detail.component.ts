import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ComponentFactoryResolver
} from '@angular/core';
import { Annotation } from '../annotation';

/**
 * Annotation detail.
 */
@Component({
  selector: 'app-annotation-detail',
  templateUrl: './annotation-detail.component.html',
  styleUrls: ['./annotation-detail.component.scss']
})
export class AnnotationDetailComponent implements OnInit {
  _annotation: Annotation;
  @Input() set annotation(annotation: Annotation) {
    this._annotation = annotation;
  }
  @Output() close = new EventEmitter<boolean>();
  constructor() {}
  ngOnInit() {}
  closed() {
    this.close.emit(true);
  }
}
