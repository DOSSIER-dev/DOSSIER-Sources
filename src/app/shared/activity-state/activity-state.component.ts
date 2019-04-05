import { Component, OnInit, Input } from '@angular/core';
import { RequestState, BackendActivityState } from '../request-watcher.service';

/**
 * Given an activity state (@see RequestWatcherService), show one
 * of two content elements.
 *
 * This is used in components that, depending on the result/progress of
 * a request, show one of two states, e.g. a normal button for opening a
 * form, and a "save ok" state.
 *
 * The following attributes are matched and projected:
 *
 *  state-initial
 *  state-saved
 */
@Component({
  selector: 'app-activity-state',
  templateUrl: './activity-state.component.html',
  styleUrls: ['./activity-state.component.scss']
})
export class ActivityStateComponent implements OnInit {
  @Input() state: BackendActivityState;
  constructor() {}

  ngOnInit() {}

  get initial() {
    if (!this.state) {
      return true;
    }
    return !(this.state.result && this.state.resultStatus);
  }
}
