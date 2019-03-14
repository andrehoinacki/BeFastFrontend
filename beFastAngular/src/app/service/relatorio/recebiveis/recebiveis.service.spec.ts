import { TestBed } from '@angular/core/testing';

import { RecebiveisService } from './recebiveis.service';

describe('RecebiveisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecebiveisService = TestBed.get(RecebiveisService);
    expect(service).toBeTruthy();
  });
});
