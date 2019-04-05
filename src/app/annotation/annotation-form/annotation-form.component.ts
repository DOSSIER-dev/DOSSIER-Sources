import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ComponentFactoryResolver
} from '@angular/core';
import { Annotation } from '../annotation';
import { LocationInputComponent } from '../location-input/location-input.component';
import { ComponentHostDirective } from 'sources-commons';
import { LocationPageComponent } from '../location-input/location-page/location-page.component';
import { LocationTimeComponent } from '../location-input/location-time/location-time.component';
import { LocationTextComponent } from '../location-input/location-text/location-text.component';
import { UrlService } from '../../sources/url.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { BackendActivityState } from 'src/app/shared/request-watcher.service';

/**
 * Floating annotation form.
 */
@Component({
  selector: 'app-annotation-form',
  templateUrl: './annotation-form.component.html',
  styles: []
})
export class AnnotationFormComponent implements OnInit {
  _internalAnnotation: Annotation;
  _orig: Annotation;
  appShareUrl = '';
  embedShareUrl = '';
  @Input() sourceEmbedUrl = '';

  @Input() set annotation(annotation: Annotation) {
    this._internalAnnotation = Object.assign(new Annotation(), annotation);
    this._orig = annotation;

    this.annotationForm.patchValue(annotation);
    this.appShareUrl = this.urlService.getInAppUrlForAnnotation(annotation);
    this.embedShareUrl = this.sourceEmbedUrl + '/' + annotation.id;

    setTimeout(() => {
      // view might not be initialised - wrapping in settimeout helps
      // TODO: however, is this engough, always?
      this.loadComponent(this.getLocationComponentType());
    }, 0);
  }

  // The sourcetype input is passed in from the annotator component
  // and determines the type of location part the will be loaded.
  @Input() sourcetype = 'text';
  @Input() activityState: BackendActivityState;

  @Output() save = new EventEmitter<Annotation>();
  @Output() cancel = new EventEmitter<Annotation>();
  @Output() delete = new EventEmitter<Annotation>();
  @Output() dirty = new EventEmitter<boolean>();

  annotationForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    public: new FormControl(false)
  });
  // Dynamically load location part of annotation
  @ViewChild(ComponentHostDirective) appComponentHost: ComponentHostDirective;
  locationInputImplementation: LocationInputComponent;

  // Map of location type to location type component
  private components = {
    page: LocationPageComponent,
    time: LocationTimeComponent,
    text: LocationTextComponent
  };

  // Map of source types to location type
  private sourcetypeComponentMapping = {
    DOC: 'page',
    VIDEO: 'time',
    VIMEO: 'time',
    IMG: 'page'
  };

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private urlService: UrlService
  ) {}

  ngOnInit() {
    // Signal form status to parent component
    this.annotationForm.statusChanges
      .pipe(
        map(v => this.annotationForm.dirty),
        distinctUntilChanged(),
        startWith(false)
      )
      .subscribe(v => this.dirty.next(v));
  }

  close() {
    this.cancel.emit(this._orig);
  }

  onSubmit() {
    Object.keys(this.annotationForm.controls).forEach(key => {
      this.annotationForm.get(key).markAsTouched();
    });
    if (!this.annotationForm.valid) {
      return;
    }

    const formValue = this.annotationForm.value;
    const annotation = Object.assign(this._internalAnnotation, formValue);
    this.save.emit(annotation);
  }

  doDelete() {
    this.delete.emit(this._orig);
  }

  private loadComponent(componentCode) {
    if (!this.components[componentCode]) {
      throw Error(`No annotation component for type '${componentCode}'`);
    }
    const component = this.components[componentCode];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.appComponentHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    this.locationInputImplementation = <LocationInputComponent>componentRef.instance;

    // Passing in reference to model (sub-component will do changes there)
    this.locationInputImplementation.annotation = this._internalAnnotation;
  }

  private getLocationComponentType() {
    return this.sourcetypeComponentMapping[this.sourcetype] || 'text';
  }
}
