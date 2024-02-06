import { TestBed } from '@angular/core/testing';

import { CreateReviewUiService } from './create-review-ui.service';

describe('CreateReviewUiService', () => {
  let service: CreateReviewUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateReviewUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
