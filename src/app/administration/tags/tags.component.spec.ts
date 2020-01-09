import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TagsComponent } from './tags.component';
import { PipeTransform, Pipe, Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { LoginStatus, AuthService } from 'src/app/core/auth.service';
import { TagService } from 'src/app/shared/tag.service';

const tagService = jasmine.createSpyObj('TagService', {
  getList: of([]),
});

@Pipe({ name: 'translate' })
class MockTranslatePipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

@Component({
  selector: 'app-tag-form',
  template: ''
})
class MockTagForm {
  @Input() tag;
  @Input() showLabels;
  @Input() showDelete;
  @Input() isManager;
}

@Component({
  selector: 'icn',
  template: ''
})
class MockIconComponent {
  @Input() name;
}
let authServiceStub: Partial<AuthService>;

describe('TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;

  beforeEach(async(() => {
    authServiceStub = {
      currentStatus$: new BehaviorSubject(new LoginStatus())
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [TagsComponent, MockTagForm, MockIconComponent, MockTranslatePipe],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: TagService, useValue: tagService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
