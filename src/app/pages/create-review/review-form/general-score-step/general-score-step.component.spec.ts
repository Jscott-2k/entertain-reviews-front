import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralScoreStepComponent } from './general-score-step.component';

describe('GeneralScoreStepComponent', () => {
  let component: GeneralScoreStepComponent;
  let fixture: ComponentFixture<GeneralScoreStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralScoreStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralScoreStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
