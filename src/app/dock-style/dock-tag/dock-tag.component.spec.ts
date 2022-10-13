import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockTagComponent } from './dock-tag.component';

describe('DockTagComponent', () => {
  let component: DockTagComponent;
  let fixture: ComponentFixture<DockTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
