import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Source } from '../source';
import { environment } from '../../../environments/environment';
import { Annotation } from '../annotation';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges {
  @Input() source: Source;
  @Output() onSelect: EventEmitter<Annotation> = new EventEmitter<Annotation>();
  aboutLink: string;
  expanded = false;
  iconElement: any;
  iconElementClose: any;
  descriptionLines: string[];
  hasAnnotations = false;

  constructor(private sanitizer: DomSanitizer, private iconRegistry: MatIconRegistry) {
    this.aboutLink = environment.sourcesProjectPage;
  }

  ngOnInit() {
    this._loadIcons();
  }

  ngOnChanges(_: SimpleChanges) {
    if (this.source) {
      const text = (this.source && this.source.description) || '';
      this.descriptionLines = text ? text.split('\n').filter(line => line.trim() !== '') : [''];
      this.hasAnnotations = this.source.annotations && this.source.annotations.length > 0;
    } else {
      this.descriptionLines = [];
      this.hasAnnotations = false;
    }
  }

  selectAnnotation(annotation: Annotation) {
    this.onSelect.emit(annotation);
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  // Load the two icon elements directly from the registry
  private _loadIcons() {
    this.iconRegistry.getNamedSvgIcon('circle-info').subscribe(el => {
      this.iconElement = this.sanitizer.bypassSecurityTrustHtml(el.outerHTML);
    });

    this.iconRegistry.getNamedSvgIcon('circle-cancel').subscribe(el => {
      this.iconElementClose = this.sanitizer.bypassSecurityTrustHtml(el.outerHTML);
    });
  }
}
