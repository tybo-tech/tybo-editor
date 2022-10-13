import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockTagPublicComponent } from './dock-tag-public.component';

describe('DockTagPublicComponent', () => {
  let component: DockTagPublicComponent;
  let fixture: ComponentFixture<DockTagPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockTagPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockTagPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
