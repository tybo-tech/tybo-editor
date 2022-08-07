import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroBorderComponent } from './micro-border.component';

describe('MicroBorderComponent', () => {
  let component: MicroBorderComponent;
  let fixture: ComponentFixture<MicroBorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroBorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
