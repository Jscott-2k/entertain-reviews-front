import { TestBed } from '@angular/core/testing';

import { IgdbImageService } from './igdb-image.service';

describe('IgdbImageService', () => {
  let service: IgdbImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IgdbImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
