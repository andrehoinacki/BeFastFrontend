import { TestBed } from '@angular/core/testing';

import { RestricaoService } from './restricao.service';

describe('TodoDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestricaoService = TestBed.get(RestricaoService);
    expect(service).toBeTruthy();
  });
});
