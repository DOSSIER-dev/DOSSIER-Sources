import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuComponent } from './submenu.component';
import { RouterModule } from '@angular/router';

describe('SubmenuComponent', () => {
  let component: SubmenuComponent;
  let fixture: ComponentFixture<SubmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubmenuComponent],
      imports: [RouterModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
