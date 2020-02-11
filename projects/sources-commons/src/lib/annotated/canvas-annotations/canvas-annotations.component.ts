import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Annotation } from '../annotation';

export class SelectionPoint {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  x: number;
  y: number;
}

/**
 * Interactive 2d annotation layer (pdf, image).
 * - displays annotations
 * - captures mouse input to select existing annotations or create new ones
 *
 * Output events
 * - annotation selected
 * - annotation changed / added
 *
 */
@Component({
  selector: 'app-canvas-annotations',
  templateUrl: './canvas-annotations.component.html',
  styleUrls: ['./canvas-annotations.component.scss']
})
export class CanvasAnnotationsComponent implements OnInit, OnChanges {

  @Input() annotations: Annotation[] = [];
  @Input() activeAnnotation: Annotation;
  @Input() width: number;
  @Input() height: number;
  @Input() scale = 1;
  @Input() addMode = false;

  @Output() annotationChange: EventEmitter<Annotation> =
    new EventEmitter<Annotation>();

  @Output() annotationSelected: EventEmitter<Annotation> =
    new EventEmitter<Annotation>();

  @Output() screenInteraction: EventEmitter<any> = new EventEmitter<any>();

  _drawRects: any[];
  inputRect: any;
  inMovement = null;
  selectionStart: SelectionPoint;
  selectionEnd: SelectionPoint;

  constructor() { }

  @ViewChild('svgOverlay', { static: true }) svgOverlay;
  @ViewChild('svgCanvas', { static: true }) svgCanvas;

  ngOnInit() {
  }

  /**
   * Changes from the outside - do a re-set size & re-render annotations.
   */
  ngOnChanges(changes: SimpleChanges) {
    const hasSizeChange = changes.width || changes.height || changes.scale;
    if (hasSizeChange) {
      this.render();
    }

    if (changes.annotations || changes.activeAnnotation) {
      this.updateRects();
    }

    if (
      // A new active annotation has been set
      (changes.activeAnnotation && changes.activeAnnotation.currentValue) ||
      // .. or a size change happend, and we have an active Annotation (corrects the position)
      (hasSizeChange && this.activeAnnotation)
    ) {
      // Emit the screen coordinates, so that the annotation can be placed
      // by the component that is responsible.
      this.screenInteraction.emit(
        this.annotationToScreenRect(this.activeAnnotation)
      );
    }
  }

  /**
   * Set size and update rectangles.
   */
  render() {
    this.setCanvasSize(this.width, this.height);
    this.updateRects();
  }

  private updateRects() {

    this._drawRects = this.annotations
      .map(anno => {
        return {
          x: Math.round(anno.pageX * this.scale),
          y: Math.round(anno.pageY * this.scale),
          width: Math.round(anno.width * this.scale),
          height: Math.round(anno.height * this.scale),
          annotation: anno,
          selected: this.activeAnnotation && anno === this.activeAnnotation
        };
      });
  }

  /**
   * Adding a new annotation.
   * Basically just emitting the annotation object to `annotationChange`.
   */
  private addAnnotation(annotation) {
    // Should our local list be updated ?
    // It will be updated from the parent component anways ...
    // this.annotations = this.annotations.concat(annotation);
    this.annotationChange.emit(annotation);
    this.screenInteraction.emit(this.annotationToScreenRect(annotation));

    // update rects will also be triggered once the parent updates the list
    // this.updateRects();
  }

  private annotationToScreenRect(anno) {
    return {
      x: anno.pageX * this.scale,
      y: anno.pageY * this.scale,
      width: anno.width * this.scale,
      height: anno.height * this.scale
    };
  }

  /**
   * Sets size of (all) involved canvas/es
   * @param x
   * @param y
   */
  private setCanvasSize(x, y) {
    this.svgCanvas.nativeElement.style.width = x + 'px';
    this.svgCanvas.nativeElement.style.height = y + 'px';
  }

  private getSelectionRectangle() {
    if (this.selectionStart && this.selectionEnd) {
      const rect = {
        x: Math.min(this.selectionStart.x, this.selectionEnd.x),
        y: Math.min(this.selectionStart.y, this.selectionEnd.y),
        width: Math.abs(this.selectionEnd.x - this.selectionStart.x),
        height: Math.abs(this.selectionEnd.y - this.selectionStart.y)
      };
      return rect;
    }
  }

  /**
   * Transform event coordinates to normalized canvas coordinates we
   * can use.
   *
   * The simple offsetX, which works in chrome,
   *
   *  const x = ev.offsetX;
   *  const y = ev.offsetY;
   *
   * does not work in Firefox, once the mouse moves over the drawing
   * rectangle (wich then becomes the new elment from which the offset is
   * calculated).
   *
   * Thus, the value is calculated using getBoundingClientRect() and
   * event.clientX/clientY (both seem to be ok supported).
   *
   * @param ev
   */
  private getSelectionPointFromEvent(ev): SelectionPoint {
    const clientRect = this.svgCanvas.nativeElement.getBoundingClientRect();
    const x = ev.clientX - clientRect.left; // ev.offsetX;
    const y = ev.clientY - clientRect.top; // ev.offsetY;
    return new SelectionPoint(x, y);
  }

  //
  // Mouse handlers:
  //

  /**
   * Mouse event handler.
   */
  globalMouseDown(ev: MouseEvent) {
    // Begin new selection
    if (! this.inMovement && this.addMode) {
      this.selectionStart = this.getSelectionPointFromEvent(ev);
      this.selectionEnd = this.getSelectionPointFromEvent(ev);
    }
  }

  /**
   * Mouse event handler.
   */
  globalMouseMove(ev: MouseEvent) {
    if (this.selectionEnd) {
      this.selectionEnd = this.getSelectionPointFromEvent(ev);
      this.inputRect = this.getSelectionRectangle();
    }

    if (this.inMovement) {
      // Currently not used.
      // Could be used for moving, resizing etc. xisting annotations.
    }
  }

  /**
   * Mouse event handler.
   */
  globalMouseUp(ev: MouseEvent) {
    if (this.inMovement) {

      this.annotationSelected.emit(this.inMovement.annotation);
      this.screenInteraction.emit(this.annotationToScreenRect(this.inMovement.annotation));

    } else {
      if (this.addMode) {
        const rect = this.getSelectionRectangle();
        if (rect) {
          const annotation = new Annotation();
          annotation.pageX = Math.round(rect.x / this.scale * 100) / 100;
          annotation.pageY = Math.round(rect.y / this.scale * 100) / 100;
          annotation.width = Math.round(rect.width / this.scale * 100) / 100;
          annotation.height = Math.round(rect.height / this.scale * 100) / 100;
          this.addAnnotation(annotation);
          this.addMode = false;
        }
      }
    }

    // Reset all state
    this.selectionStart = null;
    this.selectionEnd = null;
    this.inMovement = null;
    this.inputRect = null;
  }

  /**
   * Mouse event handler (leave interactive component)
   */
  globalMouseLeave() {
    // Reset all state
    this.selectionStart = null;
    this.selectionEnd = null;
    this.inMovement = null;
    this.inputRect = null;
  }

  /**
   * Mouse event handler (on a rectangle)
   */
  annotationMouseDown($event, annotation) {
    this.inMovement = annotation;
  }
}
