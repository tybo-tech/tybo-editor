import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementClassComponent } from './element-class.component';

describe('ElementClassComponent', () => {
  let component: ElementClassComponent;
  let fixture: ComponentFixture<ElementClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
