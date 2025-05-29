import { TestBed } from '@angular/core/testing';

import { ContratoConfigService } from './contrato-config.service';

describe('ContratoConfigService', () => {
  let service: ContratoConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratoConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
