import { Component, OnInit, Input } from '@angular/core';
import { RequestState } from '../request-watcher.service';
import { Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'app-savestate',
  template: `
    <ng-container [ngSwitch]="_state | async">
      <ng-container *ngSwitchCase="states[0]">
        <icn name="save"></icn>
      </ng-container>
      <ng-container *ngSwitchCase="states[1]">
        <mat-spinner diameter="18"></mat-spinner>
      </ng-container>
      <ng-container *ngSwitchCase="states[2]">
        <icn name="check"></icn>
      </ng-container>
      <ng-container *ngSwitchCase="states[3]">
        <icn name="error"></icn>
      </ng-container>
    </ng-container>
  `,
  styles: []
})
export class SavestateComponent implements OnInit {
  _state;

  states = [RequestState.Off, RequestState.Pending, RequestState.Success, RequestState.Error];

  constructor() {}

  @Input() set state(state: RequestState | Observable<RequestState> | Subject<RequestState>) {
    if (!(state instanceof Observable)) {
      state = of(state);
    }
    this._state = state;
  }

  ngOnInit() {}
}
