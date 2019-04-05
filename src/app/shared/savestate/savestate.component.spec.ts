import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavestateComponent } from './savestate.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'icn',
  template: ''
})
class MockIcnComponent {
  @Input() name;
}

@Component({
  selector: 'mat-spinner',
  template: ''
})
class MockSpinnerComponent {
  @Input() diameter;
}

describe('SavestateComponent', () => {
  let component: SavestateComponent;
  let fixture: ComponentFixture<SavestateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockIcnComponent, MockSpinnerComponent, SavestateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavestateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
