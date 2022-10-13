import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockLayersComponent } from './dock-layers.component';

describe('DockLayersComponent', () => {
  let component: DockLayersComponent;
  let fixture: ComponentFixture<DockLayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockLayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
