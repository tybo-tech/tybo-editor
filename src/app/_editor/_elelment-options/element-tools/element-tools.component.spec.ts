import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementToolsComponent } from './element-tools.component';

describe('ElementToolsComponent', () => {
  let component: ElementToolsComponent;
  let fixture: ComponentFixture<ElementToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
