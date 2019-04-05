import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SourceRefComponent } from '../source-ref.component';
import { SourceRef } from '../sourceref';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ResourceDetectService } from '../resource-detect/resource-detect.service';
import { SourceType } from 'sources-commons';
import { ResourceType } from '../resource-detect/resource-type';

@Component({
  selector: 'app-link-input',
  templateUrl: './link-input.component.html',
  styleUrls: ['./link-input.component.scss']
})
export class LinkInputComponent implements SourceRefComponent, OnInit {
  sourceref: SourceRef;
  resourceType: ResourceType;
  linkInput: FormControl = new FormControl();
  supportedPlatformsText = '';
  _canSubmit = false;

  @Input() sourcetype: SourceType;
  @Output() updated: EventEmitter<SourceRef> = new EventEmitter<SourceRef>();
  constructor(private resourceDetectService: ResourceDetectService) {
    const platforms = this.resourceDetectService.getSupportedPlatforms();
    this.supportedPlatformsText = platforms.join(', ');
  }

  ngOnInit() {
    this.linkInput.valueChanges.pipe(debounceTime(500)).subscribe(_ => {
      this.parseLink();
    });
  }

  onSubmit() {
    this.parseLink();
    if (this._canSubmit) {
      if (this.resourceType.hasMatch) {
        this.sourceref.sourcetype = this.resourceType.sourcetypecode;
        this.sourceref.externalServiceName = this.resourceType.service;
      }
      try {
        this.sourceref.externalServiceId = this.resourceType['embedId'];
      } catch (Error) {
        // pass
      }
      this.updated.emit(this.sourceref);
    }
  }

  parseLink() {
    const url = this.linkInput.value.trim();
    this.sourceref = new SourceRef();
    this.sourceref.sourceURL = url;
    this.resourceType = this.resourceDetectService.detectResourceTypeFromUrl(url);
    this._canSubmit = this.canSubmit();
  }

  canSubmit() {
    return this.sourceref && this.sourceref.sourceURL.trim() !== '' && this.resourceType.hasMatch;
  }
}
