import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortableListDragDropComponent } from './sortable-list-drag-drop.component';

describe('SortableListDragDropComponent', () => {
  let component: SortableListDragDropComponent;
  let fixture: ComponentFixture<SortableListDragDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortableListDragDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortableListDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
