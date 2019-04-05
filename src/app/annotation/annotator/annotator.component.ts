import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
  SimpleChanges,
  AfterViewInit,
  ComponentFactoryResolver,
  OnChanges,
  HostListener
} from '@angular/core';
import { Source } from '../../sources/source';
import { Annotation } from '../annotation';
import { UrlService } from '../../sources/url.service';
import { AnnotationService } from '../annotation.service';
import { AnnotationStateService } from '../annotation-state.service';
import { Subscription } from 'rxjs';
import {
  AnnotationComponent,
  ComponentHostDirective,
  SourceTypeService,
  AnnotationPanelService
} from 'sources-commons';
import {
  BackendActivityState,
  RequestWatcherService
} from 'src/app/shared/request-watcher.service';
import { AnnotatorFactoryService } from 'sources-commons';

@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.component.html',
  styleUrls: ['./annotator.component.scss']
})
export class AnnotatorComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() source: Source;

  // Dynamically load annotation-gui (per document type)
  @ViewChild(ComponentHostDirective) appComponentHost: ComponentHostDirective;
  annotatorComponentImpl: AnnotationComponent;

  // The annotation form.
  @ViewChild('annotationPanel')
  private annotationPanel;

  // Type of panel / panel positioning
  isStaticAnnotationDisplay = true;

  // For unsubscription on destroy
  _subscriptions: Subscription[] = [];

  // Activ annotation in edit mode
  isEdit = false;

  activityState: BackendActivityState = new BackendActivityState();

  constructor(
    private urlService: UrlService,
    private annotationService: AnnotationService,
    public annotationState: AnnotationStateService,
    private annotatorFactoryService: AnnotatorFactoryService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private panelService: AnnotationPanelService,
    private requestWatcher: RequestWatcherService
  ) {}

  ngOnInit() {}

  // TODO: could be removed ?
  ngOnChanges(changes: SimpleChanges) {
    if (changes.source) {
      // Initial setting of annotations from source - at the moment, this is
      // already done in source-view - which one is the better place ?
      // this.annotationState.setAnnotations(this.source.annotations);
    }
  }

  ngAfterViewInit() {
    // Wrap this in set timeout, to avoid
    // ExpressionChangedAfterItHasBeenCheckedError
    // TODO: are we just lucky that this works most/all of the time ?
    // TODO: better move to ngOnChanges !

    if (this.source) {
      setTimeout(() => {
        const componentClass = this.annotatorFactoryService.getComponentClass(this.source);
        this.loadComponent(componentClass);
      }, 0);
    }
  }

  ngOnDestroy() {
    this._subscriptions.forEach(v => {
      v.unsubscribe();
    });
  }

  getFileUrl() {
    return this.urlService.getSourceUrl(this.source);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      if (this.isEdit) {
        this.setIsEdit(false);
      } else {
        this.annotationState.setActiveAnnotation(null);
      }
    }
  }

  /**
   * Event from inside the GUI annotation.
   */
  annotationAdded(anno) {
    this.annotationService
      .addAnnotation(this.source.id, anno)
      .subscribe((savedAnnotation: Annotation) => {
        this.annotationState.addAnnotation(savedAnnotation);
        this.annotationState.setActiveAnnotation(savedAnnotation);
        this.setIsEdit(true);
      });
  }

  /**
   * Event from inside the GUI annotation (clicked on in the annotator GUI).
   * When called with null, it acts like 'close annotation panel'.
   */
  annotationSelected(annotation: Annotation) {
    this.annotationState.setActiveAnnotation(annotation);
  }

  /**
   * Event from inside the GUI annotation - transmits the (screen)location
   * of some interaction.
   * @param event
   */
  setInteraction(event) {
    const el = this.annotationPanel.nativeElement;
    this.panelService.positionPanel(el, event);
    this.isStaticAnnotationDisplay = this.panelService.isStaticAnnotationDisplay;
  }

  hasActiveAnnotation() {
    return this.annotationState.activeAnnotation$.getValue() !== null;
  }

  /**
   * Ready for annotation ?
   * TODO: revise the condition(s).
   */
  isSourceReadyForAnnotation() {
    return !!this.source.fileRef || this.source.sourceURL;
  }

  /**
   * Save-handler of the annotation form.
   */
  saveAnnotation(annotation: Annotation) {
    let activeAnnotation = this.annotationState.getActiveAnnotation();
    activeAnnotation = Object.assign(activeAnnotation, annotation);
    const originalObject = activeAnnotation;
    const req = this.annotationService.updateAnnotation(this.source.id, annotation);

    const watched = this.requestWatcher.watchRequest(req, this.activityState.state$);
    watched.request.subscribe(savedAnnotation => {
      this.annotationState.replaceAnnotation(originalObject, savedAnnotation);
      this.setIsEdit(false, true);
    });
  }

  /**
   * Delete-handler for annotation.
   */
  deleteAnnotation(annotation: Annotation) {
    this.annotationService.deleteAnnotation(this.source.id, annotation).subscribe(() => {
      this.annotationState.deleteAnnotation(annotation);
      this.setIsEdit(false, true);
    });
  }

  /**
   * Close handler for annotation-form.
   */
  closeAnnotation(anno) {
    this.setIsEdit(false);
    this.annotationState.setActiveAnnotation(null);
  }

  /**
   * End editing of annotation
   */
  closeAnnotationEdit(anno) {
    this.setIsEdit(false);
  }

  /**
   * Begin edit handler
   */
  editAnnotation(anno) {
    this.setIsEdit(true);
  }

  setIsEdit(state: boolean, donotcheck = false) {
    if (!state) {
      if (this._annotationEditDirty && !donotcheck) {
        // TODO: prevent closing / show confirmation
        console.warn('Close check showed form was edited (TODO: prevent closing)');
      }
      {
        this.isEdit = false;
      }
    } else {
      this.isEdit = true;
    }
  }

  _annotationEditDirty;
  setAnnotationDirtyState($event) {
    this._annotationEditDirty = $event;
  }

  private loadComponent(componentType: any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    const viewContainerRef = this.appComponentHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    const annotationComponent = <AnnotationComponent>componentRef.instance;

    annotationComponent.resourceUrl = this.getFileUrl();
    annotationComponent.source = this.source;

    // wire up state subjects/observers
    const sub1 = this.annotationState.annotations$.subscribe(
      v => (annotationComponent.annotations = v)
    );
    const sub2 = this.annotationState.activeAnnotation$.subscribe(v => {
      annotationComponent.activeAnnotation = v;
      if (v !== null) {
        // again, some duplication here .. can the the activeAnnotation
        // and the goToAnnotaion() be combined  ?
        annotationComponent.goToAnnotation(v);
      }
    });
    const sub3 = this.annotationState.addMode$.subscribe(v => (annotationComponent.addMode = v));

    // wire up events coming from the component
    const sub4 = annotationComponent.added.subscribe(v => this.annotationAdded(v));
    const sub5 = annotationComponent.selected.subscribe(v => this.annotationSelected(v));
    const sub6 = annotationComponent.interacted.subscribe(v => this.setInteraction(v));
    const sub7 = annotationComponent.loaded.subscribe(_ => {
      this.annotationState.setLoadedState(true);
    });

    this._subscriptions = this._subscriptions.concat([sub1, sub2, sub3, sub4, sub5, sub6, sub7]);
    this.annotatorComponentImpl = annotationComponent;
  }
}
