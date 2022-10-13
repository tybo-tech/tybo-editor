import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockContainerPublicComponent } from './dock-container-public.component';

describe('DockContainerPublicComponent', () => {
  let component: DockContainerPublicComponent;
  let fixture: ComponentFixture<DockContainerPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockContainerPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockContainerPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
