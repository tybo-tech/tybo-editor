import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockTagResizerComponent } from './dock-tag-resizer.component';

describe('DockTagResizerComponent', () => {
  let component: DockTagResizerComponent;
  let fixture: ComponentFixture<DockTagResizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockTagResizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockTagResizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
