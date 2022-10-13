import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroPositionComponent } from './micro-position.component';

describe('MicroPositionComponent', () => {
  let component: MicroPositionComponent;
  let fixture: ComponentFixture<MicroPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
