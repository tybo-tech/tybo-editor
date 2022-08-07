import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroTipographyComponent } from './macro-tipography.component';

describe('MacroTipographyComponent', () => {
  let component: MacroTipographyComponent;
  let fixture: ComponentFixture<MacroTipographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MacroTipographyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroTipographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
