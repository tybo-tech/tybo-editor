import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidNavBarComponent } from './wid-nav-bar.component';

describe('WidNavBarComponent', () => {
  let component: WidNavBarComponent;
  let fixture: ComponentFixture<WidNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
