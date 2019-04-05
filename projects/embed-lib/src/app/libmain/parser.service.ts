import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SourceElement } from './source-element';
import { OptionsService } from './options.service';

export interface SourceInteraction {
  state: boolean;
  element: SourceElement;
  event: MouseEvent;
}

/**
 * More than just parser, this sets event handlers to existing DOM , thus
 * becoming a kind of interface between the existing DOM and the angular app.
 */
@Injectable({
  providedIn: 'root'
})
export class ParserService {
  linkClassName: string | boolean = false;
  linkIcon = false;
  linkRegex = /\/s\/([^\/]*)(?:.*)/;
  SVGICON = `
    <svg width="16px" height="16px" fill="#17adbd" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.978 10.544a4.576 4.576 0 1 1 0-9.154 4.577 4.577 0 0 1 0
               9.154zm4.153.355l-.282-.372a5.957 5.957 0 0 0 2.108-4.549 5.978
               5.978 0 1 0-3.132 5.257l.318.419L13.188
               16c.254-.066.508-.19.757-.38.263-.201.45-.413.566-.63l-3.38-4.091z">
      </path>
    </svg>`;

  constructor(private options: OptionsService) {
    this.linkClassName = options.options.linkClassName;
    this.linkIcon = options.options.linkIcon;
  }

  hover$: Subject<SourceInteraction> = new Subject<SourceInteraction>();
  activate$: Subject<SourceElement> = new Subject<SourceElement>();
  sources$: Subject<SourceElement[]> = new Subject<SourceElement[]>();

  findSourceLinks() {
    const aTags = document.getElementsByTagName('a');
    const result = [];
    for (const link of Array.from(aTags)) {
      const href = link.href || '';
      const match = href.match(this.linkRegex);
      if (match) {
        const embedId = match[1];
        const sourceEl = new SourceElement(embedId, href);
        sourceEl.domElement = link;
        result.push([link, sourceEl]);
      }
    }
    return result;
  }

  processSourceLink(hrefDomTag: HTMLAnchorElement, sourceElement) {
    // Add an element to highlight the parsed links
    if (this.linkIcon) {
      const el = this._getSvgElement();
      hrefDomTag.appendChild(el);
    }

    // Add styling class
    if (!!this.linkClassName) {
      hrefDomTag.className = hrefDomTag.className += ' ' + this.linkClassName;
    }

    // Wire up events
    hrefDomTag.onmouseover = $event => {
      this.hover$.next({
        state: true,
        element: sourceElement,
        event: $event
      });
    };

    hrefDomTag.onmouseout = $event => {
      this.hover$.next({
        state: false,
        element: sourceElement,
        event: $event
      });
    };

    hrefDomTag.onclick = $event => {
      this.activate$.next(sourceElement);
      $event.preventDefault();
    };
  }

  load() {
    // Extract links
    const links = this.findSourceLinks();

    // Process links
    links.forEach(([tag, sourceElement]) => this.processSourceLink(tag, sourceElement));

    // Create the summary/list of sources (for the linkbox)
    const linkMap = links.reduce((result, [_, sourceElement]) => {
      result[sourceElement.embedId] = sourceElement;
      return result;
    }, {});
    this.sources$.next(Object.keys(linkMap).map(k => linkMap[k]));
  }

  private _getSvgElement() {
    const el = document.createElement('i');
    el.innerHTML = this.SVGICON;
    return el;
  }
}
