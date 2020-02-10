import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganisationService, Organisation } from '../organisation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendErrorHandlerService } from 'src/app/shared/backend-error-handler.service';
import { CanComponentDeactivate } from 'src/app/core/can-deactivate.guard';
import { distinctUntilChanged, map } from 'rxjs/operators';
import {
  RequestWatcherService,
  BackendActivityState
} from 'src/app/shared/request-watcher.service';

@Component({
  selector: 'app-organisation-view',
  templateUrl: './organisation-view.component.html',
  styleUrls: ['./organisation-view.component.scss']
})
export class OrganisationViewComponent implements OnInit, CanComponentDeactivate {
  item: Organisation;
  _dirty = false;

  activityState = new BackendActivityState();

  form = new FormGroup({
    name: new FormControl('', [Validators.required])
    // 'color': new FormControl('', []),
  });

  @ViewChild('submitButton', { static: false }) submitButton;

  constructor(
    private organisationService: OrganisationService,
    private backendErrorHandler: BackendErrorHandlerService,
    private requestWatcher: RequestWatcherService
  ) {}

  ngOnInit() {
    // Get the only organisation available (our own)
    this.organisationService.getList().subscribe(organisations => {
      this.item = organisations[0];
      this.form.patchValue(this.item);
    });

    this.form.statusChanges
      .pipe(
        map(_ => this.form.dirty),
        distinctUntilChanged()
      )
      .subscribe(v => (this._dirty = v));
  }

  submit() {
    // Set all controls as touched to show errors
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).markAsTouched();
    });

    if (!this.form.valid) {
      return;
    }

    Object.assign(this.item, this.form.value);

    const req = this.organisationService.update(this.item);
    const watched = this.requestWatcher.watchRequest(req, this.activityState.state$);

    watched.request.subscribe(
      _ => {
        this.backendErrorHandler.showSucess();
        this._dirty = false;
      },
      err => {
        this.backendErrorHandler.processErrors(err.error);
      }
    );
  }

  canDeactivate() {
    return !this._dirty;
  }

  getDeactivateContextElement() {
    return this.submitButton;
  }
}
