import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroPaddingComponent } from './micro-padding.component';

describe('MicroPaddingComponent', () => {
  let component: MicroPaddingComponent;
  let fixture: ComponentFixture<MicroPaddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroPaddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroPaddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
