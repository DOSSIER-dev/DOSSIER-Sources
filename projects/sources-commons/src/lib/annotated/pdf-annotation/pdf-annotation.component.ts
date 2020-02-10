import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { HostListener, ViewChild } from '@angular/core';
import { SourceRef } from '../sourceref';
import { Annotation } from '../annotation';
import { AnnotationComponent } from '../annotation.component';
import { Subject } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';

/**
 * An annotation component.
 * Internally, makes use of two components - one to display a page of a pdf,
 * another to display svg rectangles and take user input.
 */
@Component({
  templateUrl: './pdf-annotation.component.html',
  styleUrls: ['./pdf-annotation.component.scss']
})
export class PdfAnnotationComponent implements AnnotationComponent, OnInit,
  AfterViewInit {

  @Input() resourceUrl: string;
  @Input() source: SourceRef;
  @Input() set annotations(annotations: Annotation[]) {
    this._annotations = annotations;
    this._pageAnnotations = this._getAnnotations(this.pageNumber);
  }
  get annotations() {
    return this._annotations;
  }
  @Input() activeAnnotation: Annotation;
  @Input() addMode = false;
  @Input() viewMode;

  @Output() added: EventEmitter<Annotation> = new EventEmitter<Annotation>();
  @Output() selected: EventEmitter<Annotation> = new EventEmitter<Annotation>();
  @Output() interacted: EventEmitter<any> = new EventEmitter<any>();
  @Output() loaded: EventEmitter<any> = new EventEmitter<any>();

  _annotations: Annotation[] = [];
  _pageAnnotations: Annotation[] = [];
  pageNumber = 1;
  numPages = 1;
  pdfTitle = '';

  outerWidth = 600;
  width = 300;
  height = 400;
  scale = 1;

  /**
   * Constant for positioning the interaction event.
   */
  HEADER_HEIGHT = 42;

  MAX_COMPONENT_WIDTH = 800; // pdf display size constraint
  MIN_COMPONENT_WIDTH = 200; // pdf display size constraint

  @ViewChild('pdfContainer', { static: true }) pdfContainer;
  @ViewChild('functionHeader', { static: true }) functionHeader;

  @HostListener('window:resize')
  onResize() {
    this.resetSize();
  }

  @HostListener('window:keyup', ['$event'])
  onKey($event) {

    // Check the target tag (focused element).
    // In case of an input field, don't handle arrow keys.
    const targetTag = ('' + ($event.target && $event.target.tagName) || '')
      .toLowerCase();
    if (targetTag === 'input' || targetTag === 'textarea') {
      return;
    }

    switch ($event.key) {
      case 'ArrowLeft':
        this.prevPage();
        break;
      case 'ArrowRight':
        this.nextPage();
        break;
    }
  }

  constructor() { }

  ngOnInit() {
    this.resetSize();
  }

  ngAfterViewInit() {
    if (this.functionHeader.nativeElement.clientHeight) {
      this.HEADER_HEIGHT = this.functionHeader.nativeElement.clientHeight;
    }
  }

  get mobileMode() {
    return this.viewMode === 'mobile';
  }

  resetSize() {
    const currentWidth = this.pdfContainer.nativeElement.clientWidth;

    // Apply some min / max values for the width
    this.outerWidth = Math.max(
      this.MIN_COMPONENT_WIDTH,
      Math.min(
        currentWidth,
        this.MAX_COMPONENT_WIDTH));
  }

  updateViewport($event) {
    this.width = $event[0];
    this.height = $event[1];
    this.scale = $event[2];
  }

  hasLoaded($ev) {
    this.numPages = $ev.pages;
    this.pdfTitle = $ev.title;

    // init current page annotations
    this._pageAnnotations = this._getAnnotations(this.pageNumber);
    this.loaded.emit(true);
  }

  nextPage() {
    this.goToPage(this.pageNumber + 1);
  }

  prevPage() {
    this.goToPage(this.pageNumber - 1);
  }

  goToAnnotation(anno: any) {
    this.goToPage(anno.page);
    return anno;
  }

  annotationSelected(anno: any) {
    this.selected.emit(anno);
  }

  annotationAdded($event: Annotation) {
    // From the gui data, create the annotation.
    // Actuall, what we get from the gui/annotation component is already that.
    const annotation = $event;
    annotation.page = this.pageNumber;
    this.added.emit(annotation);
  }

  setScreenInteraction($event) {
    // manually compensate for header area
    $event.y += this.HEADER_HEIGHT;
    $event.x += $event.width / 2;
    this.interacted.emit($event);
  }

  goToPage(pagen: number) {
    if (0 < pagen && pagen <= this.numPages && this.pageNumber !== pagen) {
      this.pageNumber = pagen;
      this._pageAnnotations = this._getAnnotations(this.pageNumber);

      // Additionally, emit un-select annotation if the currently
      // selected annotation is not on the current page
      if (this.activeAnnotation && this.activeAnnotation.page !== pagen) {
        this.selected.emit(null);
      }
    }
  }

 /**
 * Filters annotations to just the ones on the page.
 *
 * @param page
 */
  private _getAnnotations(page: number = null) {
    if (page) {
      return this._annotations
        .filter(v => v.page === page);
    }
    return this._annotations;
  }

}
