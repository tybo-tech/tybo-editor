import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleSizeComponent } from './style-size.component';

describe('StyleSizeComponent', () => {
  let component: StyleSizeComponent;
  let fixture: ComponentFixture<StyleSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StyleSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
