import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceTypeComponent } from './sourcetype.component';
import { Component, Input } from '@angular/core';
import { SourceTypesConfigService } from '../sourcetype.service';

@Component({
  selector: 'mat-icon',
  template: ''
})
class MatIconMock {
  @Input() svgIcon;
  @Input() matTooltip;
}

describe('SourceTypeComponent', () => {
  let component: SourceTypeComponent;
  let fixture: ComponentFixture<SourceTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SourceTypeComponent, MatIconMock],
      providers: [{ provide: SourceTypesConfigService, useValue: { sourceTypes: [] } }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
