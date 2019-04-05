import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { TimecodeInputComponent } from './timecode-input.component';
import { FormsModule } from '@angular/forms';

describe('TimecodeInputComponent', () => {
  let component: TimecodeInputComponent;
  let fixture: ComponentFixture<TimecodeInputComponent>;

  // Inner component input elements
  let hInput: HTMLInputElement;
  let mInput: HTMLInputElement;
  let sInput: HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimecodeInputComponent],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimecodeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // The inner elements are required in almost/every test case,
    // initialise them here
    const el: HTMLElement = fixture.nativeElement;
    hInput = el.querySelector('input[name=hours]');
    mInput = el.querySelector('input[name=minutes]');
    sInput = el.querySelector('input[name=seconds]');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have three input fields', () => {
    const el: HTMLElement = fixture.nativeElement;
    const inputs = el.getElementsByTagName('input');
    expect(inputs.length).toEqual(3);
  });

  it('should display empty time data correctly', async(() => {
    component.writeValue(null);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(hInput.value).toBe('00');
      expect(mInput.value).toBe('00');
      expect(sInput.value).toBe('00');
    });
  }));

  it('should display time data in all three fields correctly', async(() => {
    component.writeValue(1 * 3600 + 2 * 60 + 3);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(hInput.value).toBe('01');
      expect(mInput.value).toBe('02');
      expect(sInput.value).toBe('03');
    });
  }));

  it('should convert time input parts back into seconds', () => {
    // both events are needed, ngModel updates binding on 'input', and the
    // component's calculate step is triggerd by the 'change' event
    hInput.value = '2';
    hInput.dispatchEvent(new Event('input'));
    hInput.dispatchEvent(new Event('change'));

    mInput.value = '13';
    mInput.dispatchEvent(new Event('input'));
    mInput.dispatchEvent(new Event('change'));

    sInput.value = '59';
    sInput.dispatchEvent(new Event('input'));
    sInput.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    expect(component.seconds).toBe(2 * 3600 + 13 * 60 + 59);
  });

  it('should normalize time inputs', async(() => {
    hInput.value = '-1'; // negativ value to be ignored
    hInput.dispatchEvent(new Event('input'));
    hInput.dispatchEvent(new Event('change'));

    mInput.value = '61'; //  overflow
    mInput.dispatchEvent(new Event('input'));
    mInput.dispatchEvent(new Event('change'));

    sInput.value = '123'; // overflow
    sInput.dispatchEvent(new Event('input'));
    sInput.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    expect(component.seconds).toBe(61 * 60 + 123);
    fixture.whenStable().then(() => {
      // normalized input parts
      expect(hInput.value).toBe('01');
      expect(mInput.value).toBe('03');
      expect(sInput.value).toBe('03');
    });
  }));
});
