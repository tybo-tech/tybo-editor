import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylePositionComponent } from './style-position.component';

describe('StylePositionComponent', () => {
  let component: StylePositionComponent;
  let fixture: ComponentFixture<StylePositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StylePositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StylePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
