import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockTyphComponent } from './dock-typh.component';

describe('DockTyphComponent', () => {
  let component: DockTyphComponent;
  let fixture: ComponentFixture<DockTyphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockTyphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockTyphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
