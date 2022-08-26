import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerMenuComponent } from './container-menu.component';

describe('ContainerMenuComponent', () => {
  let component: ContainerMenuComponent;
  let fixture: ComponentFixture<ContainerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
