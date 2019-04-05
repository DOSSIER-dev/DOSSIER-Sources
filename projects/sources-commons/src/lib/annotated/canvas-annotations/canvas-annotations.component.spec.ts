import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasAnnotationsComponent } from './canvas-annotations.component';

describe('CanvasAnnotationsComponent', () => {
  let component: CanvasAnnotationsComponent;
  let fixture: ComponentFixture<CanvasAnnotationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasAnnotationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasAnnotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
