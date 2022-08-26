import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIconsComponent } from './list-icons.component';

describe('ListIconsComponent', () => {
  let component: ListIconsComponent;
  let fixture: ComponentFixture<ListIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
