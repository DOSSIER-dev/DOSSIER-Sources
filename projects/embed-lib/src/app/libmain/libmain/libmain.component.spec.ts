import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibmainComponent } from './libmain.component';
import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sourcebox',
  template: '<p></p>'
})
class MockSourceboxComponent {
  @Input() sources: any;
}

const httpClient = jasmine.createSpyObj('HttpClient', ['post']);

describe('LibmainComponent', () => {
  let component: LibmainComponent;
  let fixture: ComponentFixture<LibmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LibmainComponent, MockSourceboxComponent],
      providers: [{ provide: HttpClient, useValue: httpClient }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
