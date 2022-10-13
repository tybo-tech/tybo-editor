import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockSpacingComponent } from './dock-spacing.component';

describe('DockSpacingComponent', () => {
  let component: DockSpacingComponent;
  let fixture: ComponentFixture<DockSpacingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockSpacingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockSpacingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
