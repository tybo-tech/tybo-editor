import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateANewWebsiteComponent } from './create-a-new-website.component';

describe('CreateANewWebsiteComponent', () => {
  let component: CreateANewWebsiteComponent;
  let fixture: ComponentFixture<CreateANewWebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateANewWebsiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateANewWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
