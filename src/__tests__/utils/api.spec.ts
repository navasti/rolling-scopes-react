import { isServerError, hasError } from 'utils';

describe('API utils', () => {
  it('should isServerError be truthy for 500 and falsy for 200', () => {
    expect(isServerError(200)).toBeFalsy();
    expect(isServerError(500)).toBeTruthy();
  });
  it('should hasError be truthy for 400 and falsy for 200', () => {
    expect(hasError(200)).toBeFalsy();
    expect(hasError(400)).toBeTruthy();
  });
});
