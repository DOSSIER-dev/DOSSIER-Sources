import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
// import { UnsavedChangesService } from '../unsaved-changes.service';

@Component({
  selector: 'app-unsaved-confirm',
  templateUrl: './unsaved-confirm.component.html',
  styleUrls: ['./unsaved-confirm.component.scss']
})
export class UnsavedConfirmComponent implements OnInit {
  @Output() close = new EventEmitter<string>();
  @Output() ignore = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  hide() {
    this.close.next('');
  }

  continue() {
    this.ignore.next('');
  }
}
