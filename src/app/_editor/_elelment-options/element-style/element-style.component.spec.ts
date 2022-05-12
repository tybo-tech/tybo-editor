import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementStyleComponent } from './element-style.component';

describe('ElementStyleComponent', () => {
  let component: ElementStyleComponent;
  let fixture: ComponentFixture<ElementStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
