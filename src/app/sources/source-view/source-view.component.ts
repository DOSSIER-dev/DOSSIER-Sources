import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Source } from '../source';
import { ActivatedRoute, Router, CanDeactivate } from '@angular/router';

import { Annotation } from '../../annotation/annotation';

import { SourceTypeService, SourceType } from 'sources-commons';

import { switchMap, map, filter, mergeMap, takeUntil, take } from 'rxjs/operators';
import { of, BehaviorSubject, combineLatest, merge, Observable, Subject } from 'rxjs';
import { SourceService } from '../source.service';
import { SourceRef } from '../../sources-inputs/sourceref';
import { AnnotationStateService } from '../../annotation/annotation-state.service';
import { BookmarkLocalService } from '../../shared/bookmark-local.service';
import { BackendErrorHandlerService } from 'src/app/shared/backend-error-handler.service';
import { TranslateService } from '@ngx-translate/core';
import { CanComponentDeactivate } from 'src/app/core/can-deactivate.guard';
import {
  RequestWatcherService,
  BackendActivityState
} from 'src/app/shared/request-watcher.service';
import { StatisticsService } from 'src/app/statistics/statistics.service';

/**
 * Source view.
 *
 * This is the main detail view when editing or viewing a source, adding
 * annotations to it etc.
 *
 * It provides functionality for all these tasks:
 *
 * - editing meta data of source
 * - s to add new source (via sourceref-input)
 * - allows to manage, change etc annotations (via annotator)
 *
 */
@Component({
  templateUrl: './source-view.component.html',
  styleUrls: ['./source-view.component.scss']
})
export class SourceViewComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  source: Source;
  annotations$: BehaviorSubject<Annotation[]> = new BehaviorSubject<Annotation[]>([]);
  activeAnnotation: Annotation;
  sourceEditing = false;
  sourceEditTouched = false;
  sourceSaveActivityState: BackendActivityState = new BackendActivityState();
  dummyErrMessage = '';

  sourcetypes$: Observable<SourceType[]>;
  sourcetype: SourceType;
  sourceStatistics$: Observable<{ hitsCount: number }>;
  destroyed$ = new Subject();

  backRoute = '';
  backState = {};

  @ViewChild('sourceEditForm', { static: false }) sourceEditForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sourceService: SourceService,
    private sourcetypeService: SourceTypeService,
    public annotationState: AnnotationStateService,
    public bookmarkService: BookmarkLocalService,
    private translateService: TranslateService,
    private backendErrorHandler: BackendErrorHandlerService,
    private requestWatcher: RequestWatcherService,
    private statistitcsService: StatisticsService
  ) {
    this.annotationState.reset([]);
  }

  ngOnInit() {
    // Load + translate available types
    this.sourcetypes$ = this.sourcetypeService.getSourceTypes$().pipe(
      mergeMap(types =>
        combineLatest(
          of(types),
          this.translateService.get(types.map(v => 'SOURCETYPES.TYPES.' + v.code))
        )
      ),
      map(([types, translations]) =>
        types.map(type =>
          Object.assign(type, {
            translatedName: translations['SOURCETYPES.TYPES.' + type.code]
          })
        )
      )
    );

    // Load source and select active annotation, if any, from parameters
    combineLatest(
      this.route.paramMap.pipe(
        map(paramMap => +paramMap.get('id')),
        switchMap(sourceId => {
          if (!sourceId) {
            // No id creates a new source (adding)
            return of(new Source());
          } else {
            // Return the source or fetch the source from backend
            return this.source && this.source.id === sourceId
              ? of(this.source)
              : this.sourceService.getSource(sourceId);
          }
        })
      ),
      this.route.paramMap.pipe(map(paramMap => +paramMap.get('annotationId')))
    ).pipe(takeUntil(this.destroyed$)).subscribe(([source, annotationId]) => {
      this.source = source;

      // Setting initial state of annotations for state-service
      this.annotationState.reset(source.annotations);
      const activeAnnotation = this.source.annotations.find(ann => ann.id === annotationId);
      if (activeAnnotation) {
        this.annotationState.setAnnotationWhenLoaded(activeAnnotation);
      }

      this.sourceStatistics$ = this.statistitcsService.getSourceStats(source);
    });

    // Edit state via query (edit) or route (add) parameters
    merge(
      this.route.queryParamMap.pipe(filter(params => !!params.get('edit'))),
      this.route.data.pipe(filter(data => !!data['add']))
    )
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => (this.sourceEditing = true));

    // Search parameters via query parameters
    this.route.queryParamMap.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      params.keys
        .filter(k => k.startsWith('_s_'))
        .forEach(k => {
          this.backState[k] = params.getAll(k);
        });
    });

    // Collect back route and search params, if any
    this.route.paramMap.pipe(takeUntil(this.destroyed$)).subscribe(paramMap => {
      if (paramMap.get('_br')) {
        this.backRoute = paramMap.get('_br');
      }
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  /**
   * Go back to list view - use backRoute and query paramters to determine
   * to correct list view. If no backRoute is set, defaults to dashboard view.
   */
  goBackToList() {
    if (this.backRoute) {
      this.router.navigate([this.backRoute], { queryParams: this.backState });
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  /**
   * Save source meta data.
   */
  saved(source: Source) {
    let req;

    // Make sure it is a complete iso date (+time).
    source.date = new Date(source.date);

    if (source.id) {
      req = this.sourceService.updateSource(source);
    } else {
      req = this.sourceService.addSource(source);
    }

    const watched = this.requestWatcher.watchRequest(req, this.sourceSaveActivityState.state$);
    watched.request.pipe(takeUntil(this.destroyed$)).subscribe(
      resp => {
        this.sourceEditing = false;
        this.sourceEditTouched = false;

        const sourceId = resp.id;
        this.router.navigate(['source', sourceId], { replaceUrl: true });
        this.source = resp;
      },
      err => {
        this.backendErrorHandler.processErrors(err);
      }
    );
  }

  /**
   * When adding new source, this sets the sourcetype.
   */
  sourceTypeSelected(selected: any[]) {
    const sourcetype = selected.length > 0 ? selected[0] : null;
    this.sourcetype = sourcetype;
    this.source.sourcetype = !!sourcetype ? sourcetype.code : null;
  }

  /**
   * Event from source-ref input that new reference was emitted.
   */
  created(ref: SourceRef) {
    // Set source reference data to source / creeate new soure.
    Object.assign(this.source, ref);
  }

  /**
   * Get status of the source: has a source type been chose, or are
   * we in the state of selecting the type.
   */
  hasSourceType() {
    return !!this.source && !!this.source.sourcetype;
  }

  /**
   * Get status of the source : does it have a file-reference, url etc -
   * or is just beeing added.
   */
  hasSourceRef() {
    return !!this.source && (!!this.source.fileRef || !!this.source.sourceURL);
  }

  /**
   * Get the status whether an annotation is just being added.
   */
  isInAddMode() {
    return this.annotationState.addMode$.getValue();
  }

  /**
   * Sends delete request to backend.
   */
  deleteSource() {
    this.sourceService.deleteSource(this.source).pipe(take(1)).subscribe(_ => {
      this.router.navigate(['/']);
    });
  }

  /**
   * Go back to sourceref input mode.
   */
  replaceSource(keepType: boolean = true) {
    // After emptying these fields, we go back to sourceref input mode
    this.source.fileRef = null;
    this.source.sourceURL = null;
    this.source.externalServiceId = null;
    this.source.sourceId = null;

    if (keepType) {
      // Set the source type again (from sourcetype code that was stored with
      // the source, we have to get the type object that contains configuration)
      this.sourcetypeService
        .getSourceTypeFromCode$(this.source.sourcetype)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(sourcetype => (this.sourcetype = sourcetype));
    } else {
      this.source.sourcetype = null;
    }

    // Switch to edit mode.
    this.sourceEditing = true;
  }

  beginEdit() {
    this.router.navigate(['source', this.source.id], {
      queryParams: { edit: 1 }
    });
  }

  /**
   * Going back from / cancelling edit view.
   */
  closeEdit() {
    if (this.source && this.source.id) {
      this.router.navigate(['source', this.source.id]);
    } else {
      this.replaceSource(false);
    }
  }

  addAnnotation() {
    this.annotationState.setAddMode(true);
  }

  cancelAddAnnotation() {
    this.annotationState.setAddMode(false);
  }

  annotationSelected(annotation: Annotation) {
    this.annotationState.setActiveAnnotation(annotation);
  }

  canDeactivate() {
    return !(this.sourceEditing && this.sourceEditTouched);
  }

  getDeactivateContextElement() {
    return this.sourceEditForm.submitButton;
  }
}
