import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicColumnWidgetComponent } from './public-column-widget.component';

describe('PublicColumnWidgetComponent', () => {
  let component: PublicColumnWidgetComponent;
  let fixture: ComponentFixture<PublicColumnWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicColumnWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicColumnWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
