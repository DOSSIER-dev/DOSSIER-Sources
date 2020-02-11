import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { ComponentHostDirective, AnnotatorFactoryService } from 'sources-commons';
import { ViewerBaseComponent } from '../viewer-base.component';
import { Source } from '../../micropage/source';
import { Annotation } from '../../micropage/annotation';
import { BehaviorSubject, Subscriber, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Encapsultes the annotation-gui components.
 */
@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() source: Source;
  @Input() annotations: Annotation[] = [];
  @Input() activeAnnotation: Annotation;
  @Output() onSelect: EventEmitter<Annotation> = new EventEmitter<Annotation>();
  @Output() onLoad: EventEmitter<any> = new EventEmitter<any>();
  @Output() onInteract: EventEmitter<any> = new EventEmitter<any>();

  activeAnnotation$ = new BehaviorSubject<Annotation>(null);

  // Dynamically load annotation-gui (per document type)
  @ViewChild(ComponentHostDirective, { static: true }) appComponentHost: ComponentHostDirective;
  annotatorComponentImpl: ViewerBaseComponent;
  destroyed$ = new Subject();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private annotatorFactoryService: AnnotatorFactoryService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // Wrap this in set timeout, to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      const component = this.annotatorFactoryService.getComponentClass(this.source);
      this.loadComponent(component);
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.activeAnnotation) {
      // Set the new annotation
      this.activeAnnotation$.next(this.activeAnnotation);
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  annotationSelected(anno: Annotation) {
    this.onSelect.next(anno);
  }

  private loadComponent(component) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.appComponentHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);

    // TODO: should we use ViewerBaseComponent or the full annotation type
    const annotationComponent = <ViewerBaseComponent>componentRef.instance;

    // annotationComponent.resourceUrl = this.getFileUrl();
    annotationComponent.resourceUrl = this.source.downloadUrl;
    annotationComponent.source = this.source;
    annotationComponent.annotations = this.source.annotations;
    annotationComponent.viewMode = 'mobile';

    // wire up state subjects/observers
    this.activeAnnotation$.pipe(takeUntil(this.destroyed$)).subscribe(
      v => {
        annotationComponent.activeAnnotation = v;
        if (!!v) {
          // again, some duplication here .. can the the activeAnnotation
          // and the goToAnnotaion() be combined  ?
          annotationComponent.goToAnnotation(v);
        }
      });

    // wire up events coming from the component
    annotationComponent.selected
      .pipe(takeUntil(this.destroyed$))
      .subscribe(v => this.annotationSelected(v));
    annotationComponent.interacted
      .pipe(takeUntil(this.destroyed$))
      .subscribe(v => this.onInteract.emit(v));

    annotationComponent.loaded
      .pipe(takeUntil(this.destroyed$))
      .subscribe(v => this.onLoad.emit(v));

    this.annotatorComponentImpl = annotationComponent;
  }
}
