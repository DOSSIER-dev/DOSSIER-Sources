import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { of } from 'rxjs';

const SVG_DUMMY_CONTENT = `<svg version="1.1"
     baseProfile="full"
     width="300" height="200"
     xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%"/>
</svg>`;
const iconRegistry = jasmine.createSpyObj('MatIconRegistry', {
  getNamedSvgIcon: of(SVG_DUMMY_CONTENT)
});


@Component({
  selector: 'micropage-sourcetype',
  template: '<p></p>'
})
class MockSourceTypeComponent {
  @Input() sourcetype;
}

@Component({
  selector: 'app-annotations',
  template: '<p></p>'
})
class MockAnnotationsComponent {
  @Input() annotations;
}

@Component({
  selector: 'app-copytext-simple',
  template: '<p></p>'
})
class MockCopytextSimpleComponent {
  @Input() value;
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        MockSourceTypeComponent,
        MockAnnotationsComponent,
        MockCopytextSimpleComponent
      ],
      providers: [{ provide: MatIconRegistry, useValue: iconRegistry }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
