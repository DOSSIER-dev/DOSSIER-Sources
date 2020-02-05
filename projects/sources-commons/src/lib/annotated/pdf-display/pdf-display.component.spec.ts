import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDisplayComponent } from './pdf-display.component';
import { SimpleChange } from '@angular/core';

describe('PdfDisplayComponent', () => {
  let component: PdfDisplayComponent;
  let fixture: ComponentFixture<PdfDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    // component.url = 'http://localhost';
    // component.ngOnChanges({
    //   url: new SimpleChange(null, component.url, true)
    // });
  });
});
