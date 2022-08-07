import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroCornersComponent } from './micro-corners.component';

describe('MicroCornersComponent', () => {
  let component: MicroCornersComponent;
  let fixture: ComponentFixture<MicroCornersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroCornersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroCornersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
