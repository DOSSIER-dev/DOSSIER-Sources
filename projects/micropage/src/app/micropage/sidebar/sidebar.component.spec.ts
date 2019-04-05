import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'micropage-sourcetype',
  template: '<p></p>'
})
class MockSourceTypeComponent {
  @Input() sourcetype;
}

@Component({
  selector: 'app-annotations',
  template: '<p></p>'
})
class MockAnnotationsComponent {
  @Input() annotations;
}

@Component({
  selector: 'app-copytext-simple',
  template: '<p></p>'
})
class MockCopytextSimpleComponent {
  @Input() value;
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        MockSourceTypeComponent,
        MockAnnotationsComponent,
        MockCopytextSimpleComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
