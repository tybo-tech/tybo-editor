import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetEventsComponent } from './widget-events.component';

describe('WidgetEventsComponent', () => {
  let component: WidgetEventsComponent;
  let fixture: ComponentFixture<WidgetEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
