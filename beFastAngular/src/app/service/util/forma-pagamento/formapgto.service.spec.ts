import { TestBed } from '@angular/core/testing';

import { FormaPagamentoService } from './formapgto.service';

describe('TodoDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormaPagamentoService = TestBed.get(FormaPagamentoService);
    expect(service).toBeTruthy();
  });
});
