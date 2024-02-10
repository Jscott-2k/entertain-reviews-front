import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsConsStepComponent } from './pros-cons-step.component';

describe('ProsConsStepComponent', () => {
  let component: ProsConsStepComponent;
  let fixture: ComponentFixture<ProsConsStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsConsStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsConsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
