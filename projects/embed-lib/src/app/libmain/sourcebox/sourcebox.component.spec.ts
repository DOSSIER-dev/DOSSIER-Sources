import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceboxComponent } from './sourcebox.component';

describe('SourceboxComponent', () => {
  let component: SourceboxComponent;
  let fixture: ComponentFixture<SourceboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SourceboxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
