import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroBackgroundComponent } from './macro-background.component';

describe('MacroBackgroundComponent', () => {
  let component: MacroBackgroundComponent;
  let fixture: ComponentFixture<MacroBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MacroBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
