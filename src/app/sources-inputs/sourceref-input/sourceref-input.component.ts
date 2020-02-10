import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { ComponentHostDirective } from 'sources-commons';
import { LinkInputComponent } from '../link-input/link-input.component';
import { SourceRefComponent } from '../source-ref.component';
import { SourceType } from 'sources-commons';
import { SourceRef } from '../sourceref';
import { FileInputComponent } from '../file-input/file-input.component';

/**
 * Generic / placeholder for source-reference inputs - such as upload form
 * or link input (the only ones at the moment).
 * This is a wrapper component that loads the inner component (actual instance)
 * dynamically, depending on the sourcetype passed in.
 */
@Component({
  selector: 'app-sourceref-input',
  templateUrl: './sourceref-input.component.html',
  styleUrls: ['./sourceref-input.component.scss']
})
export class SourcerefInputComponent implements OnInit, OnChanges {
  components = {
    file: FileInputComponent,
    link: LinkInputComponent
  };

  @Input() sourcetype: SourceType;
  @Output() created: EventEmitter<SourceRef> = new EventEmitter<SourceRef>();
  @ViewChild(ComponentHostDirective, { static: true }) appComponentHost: ComponentHostDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sourcetype) {
      if (this.sourcetype && this.sourcetype.type) {
        this.loadComponent(this.sourcetype.type);
      }
    }
  }

  loadComponent(componentCode: string) {
    const component = this.components[componentCode];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.appComponentHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<SourceRefComponent>componentRef.instance).sourcetype = this.sourcetype;
    (<SourceRefComponent>componentRef.instance).updated.subscribe((ref: SourceRef) => {
      ref.sourcetype = this.sourcetype.code;
      this.created.emit(ref);
    });
  }
}
