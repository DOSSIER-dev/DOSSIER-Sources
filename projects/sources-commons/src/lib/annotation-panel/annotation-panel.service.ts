import { Injectable } from '@angular/core';

interface AnnotationEvent {
  static: boolean;
  x: number;
  y: number;
  width: number;
  height: number;

}

/**
 * Service to help with panel appearance / panel positioning.
 */
@Injectable({
  providedIn: 'root'
})
export class AnnotationPanelService {
  PANEL_DEFAULT_WIDTH = 500;
  X_MARGIN = 10;
  isStaticAnnotationDisplay: boolean;

  constructor() { }

  positionPanel(el: HTMLElement, event: AnnotationEvent, parentElement?: HTMLElement) {
    const parent = parentElement || el.parentElement;
    const parentWidth = parent.clientWidth;
    const triangleElement = <HTMLElement>(el.getElementsByClassName('triangle-up')[0]);
    const panelElement = <HTMLElement>(el.getElementsByClassName('outer-panel')[0]);
    const eventY = (event.y + event.height);
    const eventX = event.x;

    // Take width of the panel or use default width to begin calculations with
    const width = panelElement ? panelElement.clientWidth : this.PANEL_DEFAULT_WIDTH;
    const calcDims = this.getDimensions(parentWidth, width, eventX);

    if (event.static) {
      this.isStaticAnnotationDisplay = true;
      el.style.setProperty('position', 'relative');
    } else {
      this.isStaticAnnotationDisplay = false;
      el.style.setProperty('position', 'absolute');

      el.style.setProperty('top', eventY + 'px');
      el.style.setProperty('left', calcDims.x + 'px');
      if (panelElement) {
        panelElement.style.setProperty('width', calcDims.width + 'px');
        panelElement.style.setProperty('margin-left', (-calcDims.width / 2) + 'px');
      }

      if (triangleElement) {
        triangleElement.style.setProperty('left', calcDims.nudge + 'px');
      }
    }
  }

  getIsStaticPanel() {
    return this.isStaticAnnotationDisplay;
  }

  getDimensions(parentWidth, panelWidth, x): {x: number, width: number, nudge: number} {
    const minXSpace = this.X_MARGIN;
    let modX = x;
    let modWidth = panelWidth;
    let nudge = 0;

    // Determine width
    if (modWidth > parentWidth - 2 * minXSpace) {
      modWidth = parentWidth - 2 * minXSpace;
    }

    // Check for left overflow
    if (modX - modWidth / 2 < minXSpace) {
      nudge += (modX - modWidth / 2) - minXSpace;
    }

    // Check for right overflow
    if (modX + modWidth / 2 > parentWidth - minXSpace) {
      nudge += modX - (parentWidth - minXSpace - modWidth / 2);
    }

    modX -= nudge;

    return {
      x: modX,
      width: modWidth,
      nudge: nudge
    };
  }
}
