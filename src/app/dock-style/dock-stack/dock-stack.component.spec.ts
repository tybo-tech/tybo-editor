import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockStackComponent } from './dock-stack.component';

describe('DockStackComponent', () => {
  let component: DockStackComponent;
  let fixture: ComponentFixture<DockStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockStackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
