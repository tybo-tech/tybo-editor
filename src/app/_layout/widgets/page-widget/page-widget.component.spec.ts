import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWidgetComponent } from './page-widget.component';

describe('PageWidgetComponent', () => {
  let component: PageWidgetComponent;
  let fixture: ComponentFixture<PageWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
