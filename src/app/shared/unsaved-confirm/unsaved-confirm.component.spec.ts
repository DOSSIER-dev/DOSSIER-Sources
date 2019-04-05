import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsavedConfirmComponent } from './unsaved-confirm.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-panel',
  template: ''
})
class MockPanelComponent {}

describe('UnsavedConfirmComponent', () => {
  let component: UnsavedConfirmComponent;
  let fixture: ComponentFixture<UnsavedConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockPanelComponent, UnsavedConfirmComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsavedConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
