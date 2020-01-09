import { Component, OnInit, Input } from '@angular/core';
import { SourceType } from '../sourcetype.interface';
import { SourceTypeService } from '../sourcetype.service';

/**
 * Show icon and name for a sourcetype.
 */
@Component({
  selector: 'sources-sourcetype',
  templateUrl: './sourcetype.component.html',
  styleUrls: ['./sourcetype.component.scss']
})
export class SourceTypeComponent implements OnInit {
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
