import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoriesComponent } from './stories.component';
import { PipeTransform, Pipe, Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { StoryService } from 'src/app/shared/story.service';

@Pipe({ name: 'translate' })
class MockTranslatePipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

const storyService = jasmine.createSpyObj('StoryService', {
  getList: of([])
});

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
      providers: [{ provide: StoryService, useValue: storyService }]
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
