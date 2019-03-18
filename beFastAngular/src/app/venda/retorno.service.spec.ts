import { TestBed } from '@angular/core/testing';

import { RetornoService } from './retorno.service';

describe('RetornoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetornoService = TestBed.get(RetornoService);
    expect(service).toBeTruthy();
  });
});
