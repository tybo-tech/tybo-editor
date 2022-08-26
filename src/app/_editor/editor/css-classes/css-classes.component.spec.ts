import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssClassesComponent } from './css-classes.component';

describe('CssClassesComponent', () => {
  let component: CssClassesComponent;
  let fixture: ComponentFixture<CssClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CssClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CssClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
