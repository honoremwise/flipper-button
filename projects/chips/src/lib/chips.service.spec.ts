import { TestBed, inject } from '@angular/core/testing';

import { ChipsService } from './chips.service';

describe('ChipsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChipsService]
    });
  });

  it('should be created', inject([ChipsService], (service: ChipsService) => {
    expect(service).toBeTruthy();
  }));
});
