import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SourceRefComponent } from '../source-ref.component';
import { SourceRef } from '../sourceref';
import { File } from '../file';
import { SourceType, SourceTypeMimeType } from 'sources-commons';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements SourceRefComponent, OnInit {
  _sourcetype: SourceType;
  mimetypes: string[] = [];
  extensions: string[] = [];

  @Input() set sourcetype(sourcetype: SourceType) {
    this._sourcetype = sourcetype;
    this._populateHelperLists(sourcetype.mimetypes);
  }
  get sourcetype() {
    return this._sourcetype;
  }

  @Output() updated: EventEmitter<SourceRef> = new EventEmitter<SourceRef>();

  constructor() {}

  ngOnInit() {}

  fileAdded(file: File) {
    const sourceref = new SourceRef();
    sourceref.fileRef = file;
    sourceref.fileRef_id = file.id;
    this.updated.emit(sourceref);
  }

  _populateHelperLists(mimetypes: SourceTypeMimeType[]) {
    this.mimetypes = mimetypes.map(mimetype => mimetype.mimetype);
    this.extensions = mimetypes
      .map(mimetype => {
        if (mimetype.extensions) {
          return mimetype.extensions;
        } else {
          // Get extension from the mime type string
          const parts = mimetype.mimetype.split('/');
          return [parts.pop()]; // use only last part
        }
      })
      .reduce((all, current) => all.concat(current), [])
      .sort();
  }
}
