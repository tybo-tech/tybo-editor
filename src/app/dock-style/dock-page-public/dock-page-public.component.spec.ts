import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockPagePublicComponent } from './dock-page-public.component';

describe('DockPagePublicComponent', () => {
  let component: DockPagePublicComponent;
  let fixture: ComponentFixture<DockPagePublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockPagePublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockPagePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
