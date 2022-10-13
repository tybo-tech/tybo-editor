import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockStylesComponent } from './dock-styles.component';

describe('DockStylesComponent', () => {
  let component: DockStylesComponent;
  let fixture: ComponentFixture<DockStylesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockStylesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
