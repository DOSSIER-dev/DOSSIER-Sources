import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, timer } from 'rxjs';
import { share, switchMap } from 'rxjs/operators';

const OK_TO_INITIAL_DELAY = 2000; // msec

export enum RequestState {
  Off = 1,
  Pending,
  Success,
  Error
}

export class WatchedRequest {
  constructor(public request: Observable<any>, public state: Observable<RequestState>) {}
}

export class BackendActivityState {
  state$ = new BehaviorSubject<RequestState>(RequestState.Off);
  activity = false;
  result = false;
  resultStatus;
  stateResetter = new Subject<any>();

  constructor() {
    this.stateResetter.pipe(switchMap(_ => timer(OK_TO_INITIAL_DELAY))).subscribe(_ => {
      this.state$.next(RequestState.Off);
    });

    this.state$.subscribe(st => {
      switch (st) {
        case RequestState.Pending:
          this.activity = true;
          this.result = false;
          this.resultStatus = undefined;
          break;
        case RequestState.Success:
          this.activity = false;
          this.result = true;
          this.resultStatus = true;
          this.startResetTimer();
          break;
        case RequestState.Error:
          this.activity = false;
          this.result = true;
          this.resultStatus = false;
          // this.startResetTimer();
          break;
        case RequestState.Off:
        default:
          this.activity = false;
          this.result = false;
          this.resultStatus = undefined;
      }
    });
  }

  startResetTimer() {
    this.stateResetter.next('');
  }
}

/**
 * Watch a request and provide a status.
 */
@Injectable({
  providedIn: 'root'
})
export class RequestWatcherService {
  // state$: BehaviorSubject<RequestState> = new BehaviorSubject(RequestState.Off);
  // watching: Observable<any>;
  constructor() {}

  watchRequest(req: Observable<any>, state$: Subject<RequestState>) {
    const watched = req.pipe(share());
    state$.next(RequestState.Pending);
    watched.subscribe(_ => state$.next(RequestState.Success), _ => state$.next(RequestState.Error));
    return new WatchedRequest(watched, state$);
  }
}
