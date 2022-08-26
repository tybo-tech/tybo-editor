import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteBasicDetailsComponent } from './website-basic-details.component';

describe('WebsiteBasicDetailsComponent', () => {
  let component: WebsiteBasicDetailsComponent;
  let fixture: ComponentFixture<WebsiteBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteBasicDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
