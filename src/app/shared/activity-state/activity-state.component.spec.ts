import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityStateComponent } from './activity-state.component';

describe('ActivityStateComponent', () => {
  let component: ActivityStateComponent;
  let fixture: ComponentFixture<ActivityStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityStateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
