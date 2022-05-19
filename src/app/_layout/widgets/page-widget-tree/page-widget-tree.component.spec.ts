import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWidgetTreeComponent } from './page-widget-tree.component';

describe('PageWidgetTreeComponent', () => {
  let component: PageWidgetTreeComponent;
  let fixture: ComponentFixture<PageWidgetTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageWidgetTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWidgetTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
