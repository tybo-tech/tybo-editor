import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiMadeEasyComponent } from './responsi-made-easy.component';

describe('ResponsiMadeEasyComponent', () => {
  let component: ResponsiMadeEasyComponent;
  let fixture: ComponentFixture<ResponsiMadeEasyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsiMadeEasyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiMadeEasyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
