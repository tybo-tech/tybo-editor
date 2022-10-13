import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockAddComponent } from './dock-add.component';

describe('DockAddComponent', () => {
  let component: DockAddComponent;
  let fixture: ComponentFixture<DockAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
