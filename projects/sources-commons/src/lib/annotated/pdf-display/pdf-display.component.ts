import { Component, OnInit, Input, Output, ViewChild, EventEmitter, SimpleChanges} from '@angular/core';

import pdfjsLib from 'pdfjs-dist/webpack';

@Component({
  selector: 'app-pdf-display',
  template: `
    <div class="canvas-wrapper">
      <canvas #pdfCanvas class="pdf-layer"></canvas>
    </div>`,
  styles: [
    `.canvas-wrapper { position: relative; }`,
    `.pdf-layer {
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 1;
    }`
  ]
})
export class PdfDisplayComponent implements OnInit {

  canvas: any;
  context: any;
  loaderPromise: any;

  renderInPogress = false;
  renderAttemptMade = false;  // TODO: use this to queue render attempt

  _page = 1;
  _width: number;

  @Input() set page(n: number) {
    if (n !== this._page) {
      this._page = n;
      this.render();
    }
  }

  @Input() set width(x: number) {
    if (x !== this._width) {
      this._width = x;
      this.render();
    }
  }

  @Input() url;
  @Output() viewport = new EventEmitter<any>();
  @Output() loaded = new EventEmitter<{pages: number, title: string}>();

  @ViewChild('pdfCanvas') pdfCanvas;

  constructor() { }

  ngOnInit() {
    this.canvas = this.pdfCanvas.nativeElement;
    this.context = this.canvas.getContext('2d');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.url && !!this.url) {
      this.loaderPromise = pdfjsLib.getDocument(this.url);
      this.loaderPromise.then(
        (pdf) => {
          const numPages = pdf.numPages;
          pdf.getMetadata()
            .then(data => {
              const pdfTitle = (data.info && data.info.Title) ?
                data.info.Title : '';
              this.loaded.emit({ pages: numPages, title: pdfTitle });
            });

          this.getPage();
        }, (err) => console.warn(err)
      );
    }
  }

  render() {
    if (this.loaderPromise) { // clumsy check, but have to make sure that
                              // the promise has been created and is not null
      this.getPage();
    }
  }

  getPage() {
    if (this.renderInPogress) {
      console.warn('queue render attempt');
      this.renderAttemptMade = true;
      return;
    }

    this.renderInPogress = true;
    return this.loaderPromise.then((pdf) => {
      return pdf.getPage(this._page)
        .then((pdfPage) => {
          const viewport = this.getViewport(pdfPage);
          this.setCanvasSize(viewport.width, viewport.height);
          this.viewport.emit([
            viewport.width,
            viewport.height,
            viewport.scale
          ]);
          const renderTask = pdfPage.render({
            canvasContext: this.context,
            viewport: viewport
          });

          renderTask.promise.then(() => {
            this.renderInPogress = false;
            if (this.renderAttemptMade) {
              this.renderAttemptMade = false;
              this.getPage();   // render again
            }
          });

          return renderTask.promise;
        });
    }, (err) => console.warn(err));
  }

  private setCanvasSize(x, y) {
    this.canvas.width = x;
    this.canvas.height = y;
  }

  private getViewport(pdfPage) {
    const containerWidth = this._width;
    const desiredWidth = containerWidth * 0.98;
    const viewport = pdfPage.getViewport(1);
    const scale = desiredWidth / viewport.width;
    const scaledViewport = pdfPage.getViewport(scale);
    return scaledViewport;
  }
}
