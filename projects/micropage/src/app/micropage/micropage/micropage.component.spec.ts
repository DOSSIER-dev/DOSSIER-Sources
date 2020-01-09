import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicropageComponent } from './micropage.component';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const httpClient = jasmine.createSpyObj('HttpClient', ['get']);
// const httpGetSpy = httpClient.get.and.returnValue(of({}));

@Component({
  selector: 'app-sidebar',
  template: '<p></p>'
})
class MockSidebarComponent {
  @Input() source;
}

@Component({
  selector: 'app-annotations',
  template: '<p></p>'
})
class MockAnnotationsComponent {
  @Input() annotations;
}

@Component({
  selector: 'app-viewer',
  template: '<p></p>'
})
class MockViewerComponent {
  @Input() annotations;
  @Input() activeAnnotation;
  @Input() source;
}

@Component({
  selector: 'app-annotation-panel',
  template: '<p></p>'
})
class MockAnnotationPanelComponent {
  @Input() static;
}

@Component({
  selector: 'app-annotation-detail',
  template: '<p></p>'
})
class MockAnnotationDetailComponent {
  @Input() annotation;
}

describe('MicropageComponent', () => {
  let component: MicropageComponent;
  let fixture: ComponentFixture<MicropageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MicropageComponent,
        MockSidebarComponent,
        MockAnnotationsComponent,
        MockViewerComponent,
        MockAnnotationPanelComponent,
        MockAnnotationDetailComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { data: of({ source: { fileRef : 'test.pdf'} }) } },
        { provide: HttpClient, useValue: httpClient }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicropageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
