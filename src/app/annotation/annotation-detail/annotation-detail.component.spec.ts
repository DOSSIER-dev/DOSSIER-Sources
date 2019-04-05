import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationDetailComponent } from './annotation-detail.component';
import { Component, Input, Pipe, Directive, PipeTransform } from '@angular/core';
import { UrlService } from 'src/app/sources/url.service';

@Component({
  selector: 'icn',
  template: ''
})
class MockIconComponent {}

@Component({
  selector: 'app-visibility',
  template: ''
})
class MockVisibilityComponent {
  @Input() item;
  @Input() readonly;
}

@Component({
  selector: 'app-multiline-text',
  template: ''
})
class MockMultilineTextComponent {
  @Input() content;
}

@Component({
  selector: 'app-copytext',
  template: ''
})
class MockCopyTextComponent {
  @Input() value;
}

@Component({
  selector: 'app-column-layout',
  template: ''
})
class MockColumLayoutComponent {}

@Component({
  selector: 'app-activity-state',
  template: ''
})
class MockActivityStateComponent {
  @Input() state;
}

@Component({
  selector: 'app-info-field',
  template: ''
})
class MockInfoFieldComponent {
  @Input() value;
}

@Pipe({ name: 'translate' })
class MockTranslatePipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

@Directive({
  selector: '[matTooltip]'
})
class MockTooltipDirective {
  @Input() matTooltip;
}

describe('AnnotationDetailComponent', () => {
  let component: AnnotationDetailComponent;
  let fixture: ComponentFixture<AnnotationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AnnotationDetailComponent,
        MockVisibilityComponent,
        MockIconComponent,
        MockMultilineTextComponent,
        MockCopyTextComponent,
        MockColumLayoutComponent,
        MockInfoFieldComponent,
        MockActivityStateComponent,
        MockTranslatePipe,
        MockTooltipDirective
      ],

      providers: [{ provide: UrlService, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
