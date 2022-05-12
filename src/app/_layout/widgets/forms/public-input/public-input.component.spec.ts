import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicInputComponent } from './public-input.component';

describe('PublicInputComponent', () => {
  let component: PublicInputComponent;
  let fixture: ComponentFixture<PublicInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
