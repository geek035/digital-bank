import { TestBed } from '@angular/core/testing';
import { RecoverPasswordGuard } from './recover-password.guard';

describe('MyBankGuard', () => {
  let guard: RecoverPasswordGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RecoverPasswordGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
