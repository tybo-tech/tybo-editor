import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroDisplayComponent } from './micro-display.component';

describe('MicroDisplayComponent', () => {
  let component: MicroDisplayComponent;
  let fixture: ComponentFixture<MicroDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
