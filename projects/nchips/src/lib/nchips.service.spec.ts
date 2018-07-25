import { TestBed, inject } from '@angular/core/testing';

import { NChipsService } from './nchips.service';

describe('NChipsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NChipsService]
    });
  });

  it('should be created', inject([NChipsService], (service: NChipsService) => {
    expect(service).toBeTruthy();
  }));
});
