import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralStylesComponent } from './general-styles.component';

describe('GeneralStylesComponent', () => {
  let component: GeneralStylesComponent;
  let fixture: ComponentFixture<GeneralStylesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralStylesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
