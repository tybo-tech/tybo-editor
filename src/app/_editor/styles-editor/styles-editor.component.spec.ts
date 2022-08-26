import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylesEditorComponent } from './styles-editor.component';

describe('StylesEditorComponent', () => {
  let component: StylesEditorComponent;
  let fixture: ComponentFixture<StylesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StylesEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StylesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
