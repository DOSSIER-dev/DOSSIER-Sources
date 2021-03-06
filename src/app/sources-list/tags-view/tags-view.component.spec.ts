import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsViewComponent } from './tags-view.component';
import { Component, Input, PipeTransform, Pipe } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchService } from '../search.service';
import { of } from 'rxjs';
import { TagService } from 'src/app/shared/tag.service';
import { FeedbackService } from 'src/app/shared/feedback.service';
import { BookmarkLocalService } from 'src/app/shared/bookmark-local.service';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'app-source-item',
  template: ''
})
class MockSourceItemComponent {
  @Input() source;
  @Input() backRoute;
  @Input() searchState;
}

@Component({
  selector: 'app-selectlist',
  template: ''
})
class MockSelectListComponent {
  @Input() items;
  @Input() selected;
}

@Component({
  selector: 'app-ranking-select',
  template: ''
})
class MockRankingSelectComponent {
  @Input() value;
}

@Pipe({ name: 'translate' })
class MockTranslatePipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

const searchServiceSpy = jasmine.createSpyObj('SearchService', {
  serializeState: null,
  transformState: null,
  loadSerializedState: null
});

const tagServiceSpy = jasmine.createSpyObj('TagService', {
  getList: of([{ id: 1, name: 'tag1' }])
});

const feedbackServiceSpy = jasmine.createSpyObj('FeedbackService', ['showError', 'showSuccess']);

const bookmarkServiceSpy = jasmine.createSpyObj('BookmarkLocalService', {
  getBookmarks: of([])
});

xdescribe('TagsViewComponent', () => {
  let component: TagsViewComponent;
  let fixture: ComponentFixture<TagsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          // { path: '', component: BlankCmp }, { path: 'simple', component: SimpleCmp }
        ])
      ],
      providers: [
        { provide: SearchService, useValue: searchServiceSpy },
        { provide: TagService, useValue: tagServiceSpy },
        { provide: FeedbackService, useValue: feedbackServiceSpy },
        { provide: BookmarkLocalService, useValue: bookmarkServiceSpy }
      ],
      declarations: [
        MockSourceItemComponent,
        MockSelectListComponent,
        MockRankingSelectComponent,
        MockTranslatePipe,
        TagsViewComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
