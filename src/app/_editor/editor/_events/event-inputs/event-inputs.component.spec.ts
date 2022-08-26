import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInputsComponent } from './event-inputs.component';

describe('EventInputsComponent', () => {
  let component: EventInputsComponent;
  let fixture: ComponentFixture<EventInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventInputsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
