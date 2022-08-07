import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroLayoutComponent } from './micro-layout.component';

describe('MicroLayoutComponent', () => {
  let component: MicroLayoutComponent;
  let fixture: ComponentFixture<MicroLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
