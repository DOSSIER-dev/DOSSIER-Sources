import { Component, OnInit, Input } from '@angular/core';
import { MarkdownContentService } from '../markdown-content.service';

/**
 * Wrapper around the markdown component.
 * Uses the MarkdownContentService to get the asset-url for a content name.
 */
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  _content: string;
  _filePath: string;
  @Input() set name(name: string) {
    this._content = name;
    this._filePath = this.markdownContent.getUrl(name);
  }
  get name() {
    return this._content;
  }
  constructor(private markdownContent: MarkdownContentService) {}
  ngOnInit() {}
}
