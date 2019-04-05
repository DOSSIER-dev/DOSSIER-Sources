import { Component, OnInit, Output, Input, OnChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {
  UploadOutput,
  UploadInput,
  UploadFile,
  humanizeBytes,
  UploaderOptions
} from 'ngx-uploader';
import { AuthService } from '../../core/auth.service';
import { File } from '../file';

class FileStatus {
  constructor(public status: boolean, public file?: File) {}
}

class Progress {
  constructor(public percentage?: number, public speed?: any, public name?: string) {}
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnChanges {
  options: UploaderOptions = {
    allowedContentTypes: [], // default disallow all
    concurrency: 1
  };
  formData: FormData;
  files: UploadFile[] = [];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function = humanizeBytes;
  dragOver: boolean;
  rejected: boolean;
  statusResults: FileStatus[] = [];

  progress: Progress;

  @Input() contentTypes: string[];
  @Output() uploaded: EventEmitter<File> = new EventEmitter<File>();

  // results: Subject<FileStatus> = new Subject<FileStatus>();
  // resultList: Observable<FileStatus[]>;

  constructor(private authService: AuthService) {
    // input events, we use this to emit data to ngx-uploader
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }

  // allowedContentTypes
  ngOnInit() {}

  ngOnChanges(changes) {
    if (changes.contentTypes) {
      const types = {
        allowedContentTypes: this.contentTypes
      };
      this.options = Object.assign(this.options, types);
    }
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      // when all files added in queue
      this.startUpload();
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      // add file to array when added
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      this.progress = new Progress(
        output.file.progress.data.percentage,
        output.file.progress.data.speedHuman,
        output.file.name
      );

      // update current data in files array for uploading file
      const index = this.files.findIndex(
        file => typeof output.file !== 'undefined' && file.id === output.file.id
      );
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'done') {
      const status = output.file.responseStatus;
      const statusOk = 200 <= status && status < 300;
      const fileStatus = new FileStatus(statusOk, output.file.response);

      this.statusResults.push(fileStatus);

      // remove from queue
      this.files = this.files.filter((file: UploadFile) => file !== output.file);

      // if ok, signal to parent component
      if (fileStatus.status) {
        this.uploaded.next(fileStatus.file);
      }
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
      this.rejected = false;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
      this.rejected = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
      this.rejected = false;
    } else if (output.type === 'rejected') {
      this.rejected = true;
      setTimeout(() => {
        this.rejected = false;
      }, 1000);
    }
  }

  startUpload(): void {
    const csrfToken = this.authService.getCsrfToken();
    const event: UploadInput = {
      type: 'uploadAll',
      url: '/api/files/upload/',
      method: 'POST',
      headers: { 'X-CSRFToken': csrfToken }
    };
    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }
}
