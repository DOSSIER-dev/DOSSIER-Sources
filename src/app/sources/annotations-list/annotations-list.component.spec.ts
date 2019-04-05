import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationsListComponent } from './annotations-list.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-annotation-list-item',
  template: ''
})
class MockAnnotationListItemComponent {
  @Input() annotation;
}

describe('AnnotationsListComponent', () => {
  let component: AnnotationsListComponent;
  let fixture: ComponentFixture<AnnotationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnnotationsListComponent, MockAnnotationListItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
