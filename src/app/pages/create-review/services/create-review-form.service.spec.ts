import { TestBed } from '@angular/core/testing';

import { CreateReviewFormService } from './create-review-form.service';

describe('CreateReviewFormService', () => {
  let service: CreateReviewFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateReviewFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
