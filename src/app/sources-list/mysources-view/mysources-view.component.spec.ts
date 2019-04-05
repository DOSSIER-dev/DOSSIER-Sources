import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MysourcesViewComponent } from './mysources-view.component';

xdescribe('MysourcesViewComponent', () => {
  let component: MysourcesViewComponent;
  let fixture: ComponentFixture<MysourcesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MysourcesViewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MysourcesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
