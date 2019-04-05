import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminFormComponent } from './user-admin-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Input, Component } from '@angular/core';
import { element } from '@angular/core/src/render3/instructions';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'icn',
  template: ''
})
class MockIcnComponent {
  @Input() name;
}

@Component({
  selector: 'app-delete-confirm',
  template: ''
})
class MockDeleteComponent {
  @Input() left;
}

@Component({
  selector: 'app-error',
  template: ''
})
class MockErrorComponent {
  @Input() serverErrors;
  @Input() element;
  @Input() errors;
  @Input() serverErrorField;
}

describe('UserAdminFormComponent', () => {
  let component: UserAdminFormComponent;
  let fixture: ComponentFixture<UserAdminFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        UserAdminFormComponent,
        MockIcnComponent,
        MockDeleteComponent,
        MockErrorComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
