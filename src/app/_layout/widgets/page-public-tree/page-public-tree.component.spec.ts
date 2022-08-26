import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePublicTreeComponent } from './page-public-tree.component';

describe('PagePublicTreeComponent', () => {
  let component: PagePublicTreeComponent;
  let fixture: ComponentFixture<PagePublicTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePublicTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePublicTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
