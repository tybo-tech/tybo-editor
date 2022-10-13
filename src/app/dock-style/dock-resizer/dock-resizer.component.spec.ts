import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockResizerComponent } from './dock-resizer.component';

describe('DockResizerComponent', () => {
  let component: DockResizerComponent;
  let fixture: ComponentFixture<DockResizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockResizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockResizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
