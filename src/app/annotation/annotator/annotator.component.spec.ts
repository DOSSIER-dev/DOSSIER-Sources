import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotatorComponent } from './annotator.component';
import { Input, Component } from '@angular/core';
import { UrlService } from '../../sources/url.service';
import { AnnotationService } from '../annotation.service';
import { AnnotationsConfigService } from 'sources-commons';

@Component({ selector: 'app-annotation-panel', template: '' })
class PanelMockComponent {
  @Input() static;
}

@Component({ selector: 'app-annotation-form', template: '' })
class FormMockComponent {
  @Input() annotation;
  @Input() activityState;
  @Input() sourcetype;
  @Input() sourceEmbedUrl;
}

@Component({ selector: 'app-annotation-detail', template: '' })
class DetailMockComponent {
  @Input() annotation;
  @Input() sourcetype;
  @Input() sourceEmbedUrl;
  @Input() activityState;
}

describe('AnnotatorComponent', () => {
  let component: AnnotatorComponent;
  let fixture: ComponentFixture<AnnotatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AnnotatorComponent,
        PanelMockComponent,
        FormMockComponent,
        DetailMockComponent
      ],
      providers: [
        { provide: AnnotationsConfigService, useValue: { annotatorComponents: {} } },
        { provide: UrlService, useValue: {} },
        { provide: AnnotationService, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
