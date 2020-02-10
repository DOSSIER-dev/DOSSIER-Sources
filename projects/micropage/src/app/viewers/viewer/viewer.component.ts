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
import { BehaviorSubject, Subscriber } from 'rxjs';

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
  // loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _subscriptions: Subscriber<any>[] = [];

  // Dynamically load annotation-gui (per document type)
  @ViewChild(ComponentHostDirective, { static: true }) appComponentHost: ComponentHostDirective;
  annotatorComponentImpl: ViewerBaseComponent;

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

  ngOnDestroy() {}

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

    // // wire up state subjects/observers
    // const sub1 = this.annotationState.annotations$
    //   .subscribe(v => annotationComponent.annotations = v);
    const sub2 = this.activeAnnotation$.subscribe(
      v => {
        annotationComponent.activeAnnotation = v;
        if (!!v) {
          // again, some duplication here .. can the the activeAnnotation
          // and the goToAnnotaion() be combined  ?
          annotationComponent.goToAnnotation(v);
        }
      },
      () => {},
      () => {}
    ); // TODO: debugging/Testing whether this will get removed automatically

    // wire up events coming from the component
    const sub5 = annotationComponent.selected.subscribe(v => this.annotationSelected(v));
    const sub6 = annotationComponent.interacted.subscribe(v => this.onInteract.emit(v));

    const sub7 = annotationComponent.loaded.subscribe(v => this.onLoad.emit(v));

    // this._subscriptions = this._subscriptions.concat([
    //   // sub1,
    //   sub2,
    //   // sub3, sub4, sub5, sub6
    // ]);
    this.annotatorComponentImpl = annotationComponent;
  }
}
