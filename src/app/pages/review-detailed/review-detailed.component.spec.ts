import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDetailedComponent } from './review-detailed.component';

describe('ReviewDetailedComponent', () => {
  let component: ReviewDetailedComponent;
  let fixture: ComponentFixture<ReviewDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewDetailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
