import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectlistComponent } from './selectlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { take } from 'rxjs/operators';

@Pipe({ name: 'translate' })
class MockTranslatePipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

describe('SelectlistComponent', () => {
  let component: SelectlistComponent;
  let fixture: ComponentFixture<SelectlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [SelectlistComponent, MockTranslatePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should output the current selection', () => {
    component.items = [
      { id: '1', name: 'option 1' },
      { id: '2', name: 'option 2' },
      { id: '3', name: 'option 3' }
    ];
    component.ngOnChanges({});
    const [o1, o2, o3] = component._internalItems; // have to get the internal versions

    // Check one
    component.selection.pipe(take(1)).subscribe(items => {
      expect(items.map(v => v.id)).toContain('2');
      expect(items.length).toBe(1);
    });
    component.select(o2);

    // Check another
    component.selection.pipe(take(1)).subscribe(items => {
      expect(items.map(v => v.id)).toContain('2');
      expect(items.map(v => v.id)).toContain('3');
      expect(items.length).toBe(2);
    });
    component.select(o3);

    // Uncheck one
    component.selection.pipe(take(1)).subscribe(items => {
      expect(items.map(v => v.id)).toContain('3');
      expect(items.length).toBe(1);
    });
    component.select(o2);
  });
});
