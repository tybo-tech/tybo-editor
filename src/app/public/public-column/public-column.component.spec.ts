import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicColumnComponent } from './public-column.component';

describe('PublicColumnComponent', () => {
  let component: PublicColumnComponent;
  let fixture: ComponentFixture<PublicColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
