import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  HostListener,
  ElementRef,
  Inject,
  OnDestroy
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParserService } from '../parser.service';
import { SourceElement } from '../source-element';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Source } from 'src/app/sources/source';
import { mergeMap, concatAll, catchError, filter, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { OptionsService } from '../options.service';

import { DOCUMENT } from '@angular/common';

const SOURCE_FETCH_API_URL = '/api/sources/prefetch';

@Component({
  selector: 'sourcesjs-libmain',
  templateUrl: './libmain.component.html',
  styleUrls: ['./libmain.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LibmainComponent implements OnInit, OnDestroy {
  source: SourceElement;
  sources: SourceElement[];
  fetchUrl: string;
  iframeUrl: SafeResourceUrl;
  hoverSource: SourceElement;
  destroyed$ = new Subject();

  showLinkbox: boolean;
  showHover: boolean;

  @ViewChild('hoverElement') hoverElement: ElementRef;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.close();
    }
  }

  constructor(
    private httpClient: HttpClient,
    private domSanitizer: DomSanitizer,
    private optionsService: OptionsService,
    private parserService: ParserService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.fetchUrl = optionsService.options.appserver + SOURCE_FETCH_API_URL;
    this.showLinkbox = optionsService.options.linkbox;
    this.showHover = optionsService.options.hoverbox;
  }

  fetchSource(id: string) {
    return this.httpClient.get<Source>(this.fetchUrl, { params: { id: id } });
  }

  activateSource(source: SourceElement) {
    this.source = source;
    this.iframeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(source.micropageUrl);
    this.document.body.classList.add('sourcesjs-backdrop');
  }

  close() {
    this.source = null;
    this.iframeUrl = null;
    this.document.body.classList.remove('sourcesjs-backdrop');
  }

  /**
   * Sets event handlers, then starts with parsing/loading sources links
   * and elements.
   */
  ngOnInit() {
    if (this.showHover) {
      // Hover over source link in article
      this.parserService.hover$
        .pipe(
          filter(v => v.state),
          takeUntil(this.destroyed$)
        )
        .subscribe(v => {
          this.hoverSource = v.element;
          this.hoverElement.nativeElement.style.left = v.event.clientX + 'px';
          this.hoverElement.nativeElement.style.top = v.event.clientY + 10 + 'px';
        });
      this.parserService.hover$
        .pipe(
          filter(v => !v.state),
          takeUntil(this.destroyed$)
        )
        .subscribe(_ => {
          this.hoverSource = null;
        });
    }

    // Click on source link - show the overlay
    this.parserService.activate$.pipe(takeUntil(this.destroyed$)).subscribe(v => {
      this.activateSource(v);
    });

    // TODO: this sets the sources list
    this.parserService.sources$.pipe(takeUntil(this.destroyed$)).subscribe(sources => {
      this.sources = sources;
    });

    // TODO: this already presumes the sources list is set ...
    //       make sure this works and cannot result in some race condition
    //       (Could combine the two so that sources list is added to only
    //       after an attempt to loading has been made)
    this.parserService.sources$
      .pipe(
        concatAll(),
        mergeMap(source => {
          return this.fetchSource(source.embedId).pipe(
            catchError(err => {
              console.error('Could not retrieve', source.embedId, err);
              return of(null);
            })
          );
        }),
        filter(v => v !== null),
        takeUntil(this.destroyed$)
      )
      .subscribe(source => {
        // Full source object came back, now store it to the sourceElement
        const sEl = this.sources.find(v => v.embedId === source.embedId);
        if (sEl) {
          sEl.source = source;
        }
      });

    // Initiate parsing / loading
    this.parserService.load();
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
