import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockMenuComponent } from './dock-menu.component';

describe('DockMenuComponent', () => {
  let component: DockMenuComponent;
  let fixture: ComponentFixture<DockMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
