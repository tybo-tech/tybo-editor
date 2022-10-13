import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleFillComponent } from './style-fill.component';

describe('StyleFillComponent', () => {
  let component: StyleFillComponent;
  let fixture: ComponentFixture<StyleFillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StyleFillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
