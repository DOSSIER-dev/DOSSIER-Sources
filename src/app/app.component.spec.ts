import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'router-outlet',
  template: ''
})
class MockRouterOutletComponent {}

@Component({
  selector: 'app-mainmenu',
  template: '<p>Mock Main Menu</p>'
})
class MockMainMenuComponent {}

let translateServiceStub: Partial<TranslateService>;

describe('AppComponent', () => {
  beforeEach(async(() => {
    translateServiceStub = {
      setDefaultLang: lang => {}
    };

    TestBed.configureTestingModule({
      declarations: [AppComponent, MockMainMenuComponent, MockRouterOutletComponent],
      providers: [{ provide: TranslateService, useValue: translateServiceStub }]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
