import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrittenReviewStepComponent } from './written-review-step.component';

describe('WrittenReviewStepComponent', () => {
  let component: WrittenReviewStepComponent;
  let fixture: ComponentFixture<WrittenReviewStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrittenReviewStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrittenReviewStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
