import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleAlignComponent } from './style-align.component';

describe('StyleAlignComponent', () => {
  let component: StyleAlignComponent;
  let fixture: ComponentFixture<StyleAlignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StyleAlignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleAlignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
