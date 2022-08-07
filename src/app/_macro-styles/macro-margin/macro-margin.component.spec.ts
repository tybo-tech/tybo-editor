import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroMarginComponent } from './macro-margin.component';

describe('MacroMarginComponent', () => {
  let component: MacroMarginComponent;
  let fixture: ComponentFixture<MacroMarginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MacroMarginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroMarginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
