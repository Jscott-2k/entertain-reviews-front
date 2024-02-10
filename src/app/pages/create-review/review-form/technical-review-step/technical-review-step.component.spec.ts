import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalReviewStepComponent } from './technical-review-step.component';

describe('TechnicalReviewStepComponent', () => {
  let component: TechnicalReviewStepComponent;
  let fixture: ComponentFixture<TechnicalReviewStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalReviewStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalReviewStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
