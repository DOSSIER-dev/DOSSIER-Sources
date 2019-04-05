import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminViewComponent } from './user-admin-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Component, Input, PipeTransform, Pipe } from '@angular/core';
import { StafferService } from 'src/app/shared/staffer.service';
import { of } from 'rxjs';
import { BackendErrorHandlerService } from 'src/app/shared/backend-error-handler.service';

const stafferServiceSpy = jasmine.createSpyObj('StafferService', ['getList']);
const backendErrorHandlerSpy = jasmine.createSpyObj('BackendErrorHandlerService', [
  'processErrors'
]);

@Pipe({ name: 'translate' })
class MockTranslatePipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

@Component({
  selector: 'icn',
  template: ''
})
class MockIconComponent {
  @Input() name;
}

@Component({
  selector: 'app-user-admin-form',
  template: ''
})
class MockUserFormComponent {
  @Input() item;
  @Input() serverErrors;
  @Input() showLabels;
  @Input() showDelete;
}

describe('UserAdminViewComponent', () => {
  let component: UserAdminViewComponent;
  let fixture: ComponentFixture<UserAdminViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [
        UserAdminViewComponent,
        MockIconComponent,
        MockUserFormComponent,
        MockTranslatePipe
      ],
      providers: [
        { provide: StafferService, useValue: stafferServiceSpy },
        { provide: BackendErrorHandlerService, useValue: backendErrorHandlerSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    // prep staffer service to return correct type
    stafferServiceSpy.getList.and.returnValue(of([]));

    fixture = TestBed.createComponent(UserAdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
