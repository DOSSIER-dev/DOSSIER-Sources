import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilineTextComponent } from './multiline-text.component';

describe('MultilineTextComponent', () => {
  let component: MultilineTextComponent;
  let fixture: ComponentFixture<MultilineTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultilineTextComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultilineTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
