import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexElementComponent } from './flex-element.component';

describe('FlexElementComponent', () => {
  let component: FlexElementComponent;
  let fixture: ComponentFixture<FlexElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
