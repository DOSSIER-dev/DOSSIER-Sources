import { Component, OnInit, Input } from '@angular/core';
import { SourceTypeService, SourceType } from 'projects/sources-commons/src/public_api';

@Component({
  selector: 'micropage-sourcetype',
  templateUrl: './sourcetype.component.html',
  styleUrls: ['./sourcetype.component.scss']
})
export class SourcetypeComponent implements OnInit {
  _sourcetype: SourceType;
  _iconName = 'default';
  @Input() iconOnly = false;

  @Input() set sourcetype(sourcetype: string) {
    this._sourcetype = this.sourceTypeService.getSourceTypeFromCode(sourcetype);
    this._iconName = this._sourcetype && this._sourcetype.icon ? this._sourcetype.icon : 'default';
  }

  constructor(private sourceTypeService: SourceTypeService) {}

  ngOnInit() {}
}
