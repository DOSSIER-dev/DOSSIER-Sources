import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilityInputComponent } from './visibility-input.component';
import { FormsModule } from '@angular/forms';
import { Component, Input, Pipe, PipeTransform, Directive } from '@angular/core';

@Component({
  selector: 'icn',
  template: ''
})
class MockIcnComponent {
  @Input() name;
}

@Directive({
  selector: '[matTooltip]'
})
class MockTooltipDirective {
  @Input() matTooltip;
}

@Pipe({
  name: 'translate'
})
export class MockTranslatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return '';
  }
}

describe('VisibilityInputComponent', () => {
  let component: VisibilityInputComponent;
  let fixture: ComponentFixture<VisibilityInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        VisibilityInputComponent,
        MockIcnComponent,
        MockTranslatePipe,
        MockTooltipDirective
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibilityInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be undefined by default', () => {
    expect(component._outputValue()).toBe(undefined);

    // No labels are active
    const activeLabels = fixture.nativeElement.querySelector('label.srcs-state-active');
    expect(activeLabels).toBe(null);
  });

  it('should be set public', () => {
    // CLick on public
    const el = fixture.nativeElement.querySelector('label:last-child');
    el.click();

    fixture.detectChanges();

    // Check that one label has the active class, the other has not
    expect(
      fixture.nativeElement.querySelector('label.srcs-state-active icn[name="locked"]')
    ).toBeNull();
    expect(
      fixture.nativeElement.querySelector('label.srcs-state-active icn[name="public"]')
    ).not.toBeNull();

    // Form field value
    expect(component._outputValue()).toBe(true);
  });

  it('should be set confidential', () => {
    // CLick on confidential
    const el = fixture.nativeElement.querySelector('label:first-child');
    el.click();

    fixture.detectChanges();

    // Check that one label has the active class, the other has not
    expect(
      fixture.nativeElement.querySelector('label.srcs-state-active icn[name="locked"]')
    ).not.toBeNull();
    expect(
      fixture.nativeElement.querySelector('label.srcs-state-active icn[name="public"]')
    ).toBeNull();

    // Form field value
    expect(component._outputValue()).toBe(false);
  });
});
