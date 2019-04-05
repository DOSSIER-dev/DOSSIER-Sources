import { Component, Input } from '@angular/core';

/**
 * Display multiline text with linebreaks / in paragraphs.
 */
@Component({
  selector: 'app-multiline-text',
  template: `
    <p *ngFor="let line of _lines">{{ line }}</p>
  `,
  styles: [
    `
      p {
        margin: 0.2em 0;
        min-height: 1.3em;
      }
    `
  ]
})
export class MultilineTextComponent {
  _content: string;
  _lines: string[] = [];
  @Input() set content(content: string) {
    const text = '' + (content || '');
    this._content = text;
    this._lines = text.split('\n').map(line => line.trim());
  }
}
