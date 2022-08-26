import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementClassBettaComponent } from './element-class-betta.component';

describe('ElementClassBettaComponent', () => {
  let component: ElementClassBettaComponent;
  let fixture: ComponentFixture<ElementClassBettaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementClassBettaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementClassBettaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
