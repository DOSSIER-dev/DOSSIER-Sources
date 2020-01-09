import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerComponent } from './viewer.component';
import { AnnotationsConfigService, AnnotationComponent } from 'sources-commons';
import { Source } from '../../micropage/source';
import { NgModule, Component } from '@angular/core';


@Component({
  template: ''
})
export class DummyComponent implements AnnotationComponent {
  resourceUrl;
  source;
  annotations;
  activeAnnotation;
  addMode;
  added;
  selected;
  interacted;
  loaded;
  goToAnnotation;
}

@NgModule({
  declarations: [DummyComponent],
  entryComponents: [DummyComponent]
})
class TestModule {}

const DUMMY_SOURCE = {
  fileRef: {
    mimeType: 'application/pdf'
  }
};
xdescribe('ViewerComponent', () => {
  let component: ViewerComponent;
  let fixture: ComponentFixture<ViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ViewerComponent],
      providers: [
        {
          provide: AnnotationsConfigService,
          useValue: { annotatorComponents: { PDF: DummyComponent } }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerComponent);
    component = fixture.componentInstance;
    component.source = Object.assign(new Source(), DUMMY_SOURCE);
    fixture.detectChanges();
  });

  it('should create', () => {
    // TODO: look into how viewContainerRef can be set in the viewer
    expect(component).toBeTruthy();
  });
});
