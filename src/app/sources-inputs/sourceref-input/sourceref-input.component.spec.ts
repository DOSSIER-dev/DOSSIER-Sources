import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcerefInputComponent } from './sourceref-input.component';

describe('SourcerefInputComponent', () => {
  let component: SourcerefInputComponent;
  let fixture: ComponentFixture<SourcerefInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SourcerefInputComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcerefInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
