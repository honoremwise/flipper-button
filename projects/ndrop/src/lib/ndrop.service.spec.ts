import { TestBed, inject } from '@angular/core/testing';

import { NDropService } from './ndrop.service';

describe('NDropService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NDropService]
    });
  });

  it('should be created', inject([NDropService], (service: NDropService) => {
    expect(service).toBeTruthy();
  }));
});
