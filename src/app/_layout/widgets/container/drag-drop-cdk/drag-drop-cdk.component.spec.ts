import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropCdkComponent } from './drag-drop-cdk.component';

describe('DragDropCdkComponent', () => {
  let component: DragDropCdkComponent;
  let fixture: ComponentFixture<DragDropCdkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropCdkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropCdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
