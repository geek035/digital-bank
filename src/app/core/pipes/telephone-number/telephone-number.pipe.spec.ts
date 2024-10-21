import { TelephoneNumberPipe } from './telephone-number.pipe';

describe('TelephoneNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new TelephoneNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
