import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveNavBarComponent } from './responsive-nav-bar.component';

describe('ResponsiveNavBarComponent', () => {
  let component: ResponsiveNavBarComponent;
  let fixture: ComponentFixture<ResponsiveNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsiveNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
