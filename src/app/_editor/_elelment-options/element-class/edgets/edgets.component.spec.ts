import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgetsComponent } from './edgets.component';

describe('EdgetsComponent', () => {
  let component: EdgetsComponent;
  let fixture: ComponentFixture<EdgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdgetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
