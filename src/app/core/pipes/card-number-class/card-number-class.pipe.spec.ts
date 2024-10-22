import { CardNumberClassPipe } from './card-number-class.pipe';

describe('CardNumberClassPipe', () => {
  it('create an instance', () => {
    const pipe = new CardNumberClassPipe();
    expect(pipe).toBeTruthy();
  });
});
