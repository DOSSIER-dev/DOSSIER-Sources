import { Component, OnInit, EventEmitter, Input, ViewChild, Output, HostListener } from '@angular/core';
import { AnnotationComponent } from '../annotation.component';
import { Annotation } from '../annotation';
import { SourceRef } from '../sourceref';

@Component({
  selector: 'app-image-annotation',
  templateUrl: './image-annotation.component.html',
  styleUrls: ['./image-annotation.component.scss']
})
export class ImageAnnotationComponent implements AnnotationComponent, OnInit {
  _source: SourceRef;
  _imageUrl = '';

  // Default values for the image size
  width = 600;
  height = 400;

  // Would have to be set if image is resized
  scale = 1;

  /**
   * Constant for positioning the interaction event.
   */
  headerHeight = 5;

  @ViewChild('imgElement', { static: true }) imgElement;
  @ViewChild('wrapperElement', { static: true }) wrapperElement;
  @Input() resourceUrl: string;

  // TODO: subtle gotcha here : when source is getting set, the resource url
  //       must already be present ! again, resolve the duplication of resourceUrl + source !!
  @Input() set source(source: SourceRef) {
    this._source = source;
    this._imageUrl = this.resourceUrl;
  }

  get source() {
    return this._source;
  }

  @Input() annotations: Annotation[];
  @Input() activeAnnotation: Annotation;
  @Input() addMode = false;
  @Input() viewMode;

  @Output() added: EventEmitter<Annotation> = new EventEmitter<Annotation>();
  @Output() selected: EventEmitter<Annotation> = new EventEmitter<Annotation>();
  @Output() interacted: EventEmitter<Annotation> = new EventEmitter<Annotation>();
  @Output() loaded: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('window:resize')
  onResize() {
    this.resetSize();
  }

  constructor() { }

  ngOnInit() {
  }

  /**
   * Event handler for on-load. Used as a signal for determining
   * dimensions (and scale) of the image.
   * TODO: could combine the two loading tasks and change
   * the width/height/scale only once together.
   * @param $event
   */
  imageOnLoad($event) {
    // once image is loaded, we can set size of the annotation layer
    this.resetSize();
  }

  goToAnnotation(annotation: Annotation) {
    //
  }

  annotationSelected(anno: any) {
    this.selected.emit(anno);
  }

  annotationAdded($event: Annotation) {
    // From the gui data, create the annotation.
    // Actuall, what we get from the gui/annotation component is already that.
    const annotation = $event;
    this.added.emit(annotation);
  }

  setScreenInteraction($event) {
    // manually compensate for header area
    $event.y += this.headerHeight;
    $event.x += $event.width / 2;
    this.interacted.emit($event);
  }

  private resetSize() {
    this.width = this.imgElement.nativeElement.width;
    this.height = this.imgElement.nativeElement.height;

    this.getImgSize(this._imageUrl)
      .then(
        ([w, h]) => {
          this.scale = Math.round(100 * this.width / w) / 100;
          this.loaded.emit(true);
        }
      );
  }

  /**
   * Determine the orginal image dimensions.
   * This approach initialises another image object and after loading
   * reads out its dimensions.
   */
  private getImgSize(imgSrc) {
    const promise = new Promise((resolve, reject) => {
      const newImg = new Image();
      newImg.onload = function () {
        return resolve([newImg.width, newImg.height]);
      };
      newImg.src = imgSrc;
    });
    return promise;
  }
}
