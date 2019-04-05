import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SourceRef } from '../sourceref';
import { AnnotationComponent } from '../annotation.component';
import { Annotation } from '../annotation';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-text-annotation',
  templateUrl: './text-annotation.component.html',
  styleUrls: ['./text-annotation.component.scss']
})
export class TextAnnotationComponent implements AnnotationComponent, OnInit {
  _sanitizedUrl;

  @Input() resourceUrl: string;
  @Input() set source(source: SourceRef) {
    this._source = source;

    this._sanitizedUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
      source.downloadUrl);
    this.loaded.emit(true);
  }
  get source() {
    return this._source;
  }
  @Input() annotations: Annotation[];
  @Input() activeAnnotation: Annotation;
  @Input() set addMode(state: boolean) {
    if (state) {
      this.added.emit(new Annotation());
    }
  }
  @Input() viewMode;

  @Output() added: EventEmitter<Annotation> = new EventEmitter<Annotation>();
  @Output() selected: EventEmitter<Annotation> = new EventEmitter<Annotation>();
  @Output() interacted: EventEmitter<Annotation> = new EventEmitter<Annotation>();
  @Output() loaded: EventEmitter<any> = new EventEmitter<any>();

  _source: SourceRef;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  goToAnnotation(anno: Annotation) {
  }

  annotationAdded($event: Annotation) {
    // const annotation = $event;
    // this.added.emit(annotation);
  }
}
