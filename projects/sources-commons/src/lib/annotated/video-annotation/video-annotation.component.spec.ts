import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAnnotationComponent } from './video-annotation.component';

describe('VideoAnnotationComponent', () => {
  let component: VideoAnnotationComponent;
  let fixture: ComponentFixture<VideoAnnotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoAnnotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
