import { AccountClassPipe } from './account-class.pipe';

describe('AccountClassPipe', () => {
  it('create an instance', () => {
    const pipe = new AccountClassPipe();
    expect(pipe).toBeTruthy();
  });
});
