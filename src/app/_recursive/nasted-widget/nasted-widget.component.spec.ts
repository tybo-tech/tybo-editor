import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastedWidgetComponent } from './nasted-widget.component';

describe('NastedWidgetComponent', () => {
  let component: NastedWidgetComponent;
  let fixture: ComponentFixture<NastedWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NastedWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NastedWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
