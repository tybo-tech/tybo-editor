import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementOptionsComponent } from './element-options.component';

describe('ElementOptionsComponent', () => {
  let component: ElementOptionsComponent;
  let fixture: ComponentFixture<ElementOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
