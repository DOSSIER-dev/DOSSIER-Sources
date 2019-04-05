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
import { UrlService } from '../../sources/url.service';
import { BackendActivityState } from 'src/app/shared/request-watcher.service';

@Component({
  selector: 'app-annotation-detail',
  templateUrl: './annotation-detail.component.html',
  styleUrls: ['./annotation-detail.component.scss']
})
export class AnnotationDetailComponent implements OnInit {
  _internalAnnotation: Annotation;
  _orig: Annotation;
  appShareUrl = '';
  embedShareUrl = '';
  @Input() sourceEmbedUrl = '';
  @Input() activityState: BackendActivityState;

  @Input() set annotation(annotation: Annotation) {
    this._internalAnnotation = Object.assign(new Annotation(), annotation);
    this._orig = annotation;
    this.appShareUrl = this.urlService.getInAppUrlForAnnotation(annotation);
    this.embedShareUrl = this.sourceEmbedUrl + '/' + annotation.id;
  }

  @Input() sourcetype = 'text';
  @Output() cancel = new EventEmitter<Annotation>();
  @Output() edit = new EventEmitter<Annotation>();

  constructor(private urlService: UrlService) {}

  ngOnInit() {}

  startEdit() {
    this.edit.emit(this._orig);
  }

  close() {
    this.cancel.emit(this._orig);
  }
}
