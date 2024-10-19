import { TestBed } from '@angular/core/testing';

import { CardRegisterOperationService } from './card-register-operation.service';

describe('CardRegisterOperationService', () => {
  let service: CardRegisterOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardRegisterOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
