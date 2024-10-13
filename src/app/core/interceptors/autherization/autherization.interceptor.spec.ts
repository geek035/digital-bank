import { TestBed } from '@angular/core/testing';

import { AutherizationInterceptor } from './autherization.interceptor';

describe('AutherizationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AutherizationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AutherizationInterceptor = TestBed.inject(AutherizationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
