import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkViewComponent } from './bookmark-view.component';
import { Input, Component, Pipe, PipeTransform } from '@angular/core';
import { BookmarkLocalService } from 'src/app/shared/bookmark-local.service';
import { of } from 'rxjs';
import { FeedbackService } from 'src/app/shared/feedback.service';

@Pipe({ name: 'translate' })
class MockTranslatePipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

@Component({
  selector: 'app-source-item',
  template: ''
})
class MockSourceItemComponent {
  @Input() source;
  @Input() backRoute;
  @Input() searchState;
}

const bookmarkServiceSpy = jasmine.createSpyObj('BookmarkLocalService', {
  getBookmarks: of([])
});

const feedbackServiceSpy = jasmine.createSpyObj('FeedbackService', ['showError', 'showSuccess']);

describe('BookmarkViewComponent', () => {
  let component: BookmarkViewComponent;
  let fixture: ComponentFixture<BookmarkViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockSourceItemComponent, MockTranslatePipe, BookmarkViewComponent],
      providers: [
        { provide: BookmarkLocalService, useValue: bookmarkServiceSpy },
        { provide: FeedbackService, useValue: feedbackServiceSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
