import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWidgtesNavigationTreeComponent } from './page-widgtes-navigation-tree.component';

describe('PageWidgtesNavigationTreeComponent', () => {
  let component: PageWidgtesNavigationTreeComponent;
  let fixture: ComponentFixture<PageWidgtesNavigationTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageWidgtesNavigationTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWidgtesNavigationTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
