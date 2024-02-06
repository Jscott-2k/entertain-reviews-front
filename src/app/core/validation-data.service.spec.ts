import { TestBed } from '@angular/core/testing';

import { ValidationDataService } from './validation-data.service';

describe('ValidationDataService', () => {
  let service: ValidationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
