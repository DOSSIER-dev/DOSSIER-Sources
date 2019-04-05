import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoriesComponent } from './stories.component';
import { PipeTransform, Pipe, Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

const httpClient = jasmine.createSpyObj('HttpClient', ['post']);

@Pipe({ name: 'translate' })
class MockTranslatePipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

@Component({
  selector: 'app-story-form',
  template: ''
})
class MockStoryForm {
  @Input() story;
  @Input() showLabels;
  @Input() showDelete;
}

@Component({
  selector: 'icn',
  template: ''
})
class MockIconComponent {
  @Input() name;
}

describe('StoriesComponent', () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [StoriesComponent, MockStoryForm, MockIconComponent, MockTranslatePipe],
      providers: [{ provide: HttpClient, useValue: httpClient }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
