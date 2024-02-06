import { TestBed } from '@angular/core/testing';

import { CreateReviewLogicService } from './create-review-logic.service';

describe('CreateReviewLogicService', () => {
  let service: CreateReviewLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateReviewLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
