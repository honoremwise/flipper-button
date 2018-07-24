import { TestBed, inject } from '@angular/core/testing';

import { NUploadService } from './nupload.service';

describe('NUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NUploadService]
    });
  });

  it('should be created', inject([NUploadService], (service: NUploadService) => {
    expect(service).toBeTruthy();
  }));
});
