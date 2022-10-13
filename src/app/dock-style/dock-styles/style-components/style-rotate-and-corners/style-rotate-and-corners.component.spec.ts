import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleRotateAndCornersComponent } from './style-rotate-and-corners.component';

describe('StyleRotateAndCornersComponent', () => {
  let component: StyleRotateAndCornersComponent;
  let fixture: ComponentFixture<StyleRotateAndCornersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StyleRotateAndCornersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleRotateAndCornersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
