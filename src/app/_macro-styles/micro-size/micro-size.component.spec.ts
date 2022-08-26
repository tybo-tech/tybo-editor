import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroSizeComponent } from './micro-size.component';

describe('MicroSizeComponent', () => {
  let component: MicroSizeComponent;
  let fixture: ComponentFixture<MicroSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
