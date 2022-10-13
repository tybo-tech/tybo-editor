import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleDockComponent } from './style-dock.component';

describe('StyleDockComponent', () => {
  let component: StyleDockComponent;
  let fixture: ComponentFixture<StyleDockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StyleDockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleDockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
