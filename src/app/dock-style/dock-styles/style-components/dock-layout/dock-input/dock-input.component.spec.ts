import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockInputComponent } from './dock-input.component';

describe('DockInputComponent', () => {
  let component: DockInputComponent;
  let fixture: ComponentFixture<DockInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
