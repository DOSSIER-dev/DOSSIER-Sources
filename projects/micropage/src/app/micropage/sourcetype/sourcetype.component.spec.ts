import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcetypeComponent } from './sourcetype.component';
import { Component, Input } from '@angular/core';
import { SourceTypesConfigService } from 'projects/sources-commons/src/public_api';

@Component({
  selector: 'mat-icon',
  template: '<p></p>'
})
class MockMatIconComponent {
  @Input() svgIcon;
}

describe('SourcetypeComponent', () => {
  let component: SourcetypeComponent;
  let fixture: ComponentFixture<SourcetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SourcetypeComponent, MockMatIconComponent],
      providers: [{ provide: SourceTypesConfigService, useValue: { sourceTypes: [] } }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
