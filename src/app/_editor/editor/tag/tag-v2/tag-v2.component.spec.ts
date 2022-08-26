import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagV2Component } from './tag-v2.component';

describe('TagV2Component', () => {
  let component: TagV2Component;
  let fixture: ComponentFixture<TagV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
