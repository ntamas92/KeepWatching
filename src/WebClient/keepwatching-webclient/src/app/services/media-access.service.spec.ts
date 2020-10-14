import { TestBed } from '@angular/core/testing';

import { MediaAccessService } from './media-access.service';

describe('MediaAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaAccessService = TestBed.get(MediaAccessService);
    expect(service).toBeTruthy();
  });
});
