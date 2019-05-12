import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainmenuComponent } from './mainmenu.component';
import { Component, Pipe } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, User, LoginStatus } from '../../core/auth.service';
import { BehaviorSubject, of } from 'rxjs';

@Component({
  selector: 'icn',
  template: ''
})
class MockIconComponent {
  // @Input() name;
}

@Pipe({
  name: 'username'
})
class MockUsernamePipe {}
let authServiceStub: Partial<AuthService>;

describe('MainmenuComponent', () => {
  let component: MainmenuComponent;
  let fixture: ComponentFixture<MainmenuComponent>;

  beforeEach(async(() => {
    authServiceStub = {
      updateCurrentUser: () => of(<User>{}),
      currentStatus$: new BehaviorSubject(new LoginStatus())
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [MainmenuComponent, MockIconComponent, MockUsernamePipe],
      providers: [
        { provide: AuthService, useValue: authServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
