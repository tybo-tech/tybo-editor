import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockPageComponent } from './dock-page.component';

describe('DockPageComponent', () => {
  let component: DockPageComponent;
  let fixture: ComponentFixture<DockPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
