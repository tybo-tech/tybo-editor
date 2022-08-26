import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTagComponent } from './public-tag.component';

describe('PublicTagComponent', () => {
  let component: PublicTagComponent;
  let fixture: ComponentFixture<PublicTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
