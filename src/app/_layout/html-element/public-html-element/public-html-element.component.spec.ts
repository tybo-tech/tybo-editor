import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHtmlElementComponent } from './public-html-element.component';

describe('PublicHtmlElementComponent', () => {
  let component: PublicHtmlElementComponent;
  let fixture: ComponentFixture<PublicHtmlElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicHtmlElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHtmlElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
