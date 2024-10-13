import { TestBed } from '@angular/core/testing';

import { MyBankGuard } from './my-bank.guard';

describe('MyBankGuard', () => {
  let guard: MyBankGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MyBankGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
